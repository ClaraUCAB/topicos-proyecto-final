import { Request, Response } from 'express';

export interface IImageHandler {
	execute(req: Request, res: Response);
}
