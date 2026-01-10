import { ILogger } from '../logging/ILogger.ts';
import { IImageOperation } from '../services/operations/IImageOperation.ts';

class LoggingDecorator implements IImageOperation {
	constructor(
		private inner: IImageOperation,
		private logger: ILogger,
	) {}

	async execute(buffer: Buffer, params?: any): Promise<Buffer> {
		const start = Date.now();

		try {
			const result = await this.inner.execute(buffer, params);
			await this.logger.log({
				/* éxito */
			});
			return result;
		} catch (error) {
			await this.logger.log({
				/* error */
			});
			throw error;
		}
	}
}
