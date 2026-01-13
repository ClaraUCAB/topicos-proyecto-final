import type { IImageHandler } from '../handlers/IImageHandler';
import { ILogger, OperationResult, LogLevel, LogEntry } from '../logging/ILogger';
import type { IImageOperation } from '../services/operations/IImageOperation';
import type { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class LoggingDecorator implements IImageHandler {
	constructor(
		private inner: IImageHandler,
		private logger: ILogger,
	) {}

	async execute(req: Request, res: Response) {
		let start = new Date();
		let inicio = performance.now();

		const jwt = (req.get('Authorization') || '').replace('Bearer ', '');
		const correo = (await AuthService.getEmailFromJWT(jwt)) || 'correo';

		const logEntry: LogEntry = {
			timestamp: start,
			level: null, // TBD
			userEmail: correo,
			endpoint: req.originalUrl,
			parameters: req.body,
			executionTime: null, // TBD
			result: null, // TBD
		};

		try {
			const result = await this.inner.execute(req, res);
			const final = performance.now();

			logEntry.level = LogLevel.Info;
			logEntry.executionTime = final - inicio;
			logEntry.result = OperationResult.Success;

			await this.logger.log(logEntry);
			return result;
		} catch (error) {
			let final = performance.now();

			logEntry.level = LogLevel.Error;
			logEntry.executionTime = final - inicio;
			logEntry.result = OperationResult.Failure;

			await this.logger.log(logEntry);
			throw error;
		}
	}

	async getCorreo() {}
}
