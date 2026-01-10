import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { ApiResponse, StatusCode } from '../types/index';
import { IImageHandler } from '../handlers/IImageHandler';

export class AuthDecorator implements IImageHandler {
	constructor(
		private inner: IImageHandler,
		private authService: AuthService,
	) {}

	async execute(req: Request, res: Response) {
		const token = req.get('Authorization');

		console.log(`[DEBUG] ${token}.`);

		if (!(await this.authService.verifyJWT(token))) {
			console.log('me cagué');
			const response: ApiResponse = {
				success: false,
				error: 'Usuario no autorizado',
				timestamp: new Date().toISOString(),
			};

			res.status(StatusCode.InvalidJWT).json(response);
		}

		this.inner.execute(req, res);
	}
}
