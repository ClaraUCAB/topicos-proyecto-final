import type { Request, Response } from 'express';
import type { AuthService } from '../services/AuthService';
import { ApiResponse, StatusCode, type AuthApiResponse } from '../types/index';
import type { IImageHandler } from '../handlers/IImageHandler';
import { HTTPError } from '../types/error';

export class AuthDecorator implements IImageHandler {
	constructor(
		private inner: IImageHandler,
		private authService: AuthService,
	) {}

	async execute(req: Request, res: Response) {
		let token = req.get('Authorization');

		const errorResponse: ApiResponse<AuthApiResponse> = {
			success: false,
			error: 'Usuario no autorizado',
			timestamp: new Date().toISOString(),
		};

		if (!token || !token.startsWith('Bearer')) {
			res.status(StatusCode.InvalidJWT).json(errorResponse);
			throw new HTTPError('Token JWT ausente o inválido.', 401);
		}

		token = token.replace('Bearer ', '');

		if (!(await this.authService.verifyJWT(token))) {
			res.status(StatusCode.InvalidJWT).json(errorResponse);
			throw new HTTPError('Token JWT ausente o inválido.', 401);
		}

		await this.inner.execute(req, res);
	}
}
