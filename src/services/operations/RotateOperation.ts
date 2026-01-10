import sharp from 'sharp';

import { IImageOperation } from './IImageOperation';
import { ImageParams } from '../../types/index';

export class RotateOperation implements IImageOperation {
	async execute(buffer: Buffer, params: ImageParams): Promise<Buffer> {
		return sharp(buffer).rotate(params.angle).toBuffer();
	}
}
