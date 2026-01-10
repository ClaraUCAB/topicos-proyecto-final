import sharp from 'sharp';

import { IImageOperation } from './IImageOperation';
import { ImageParams } from '../../types/index';

export class ResizeOperation implements IImageOperation {
	async execute(buffer: Buffer, params: ImageParams): Promise<Buffer> {
		return sharp(buffer).resize(params.width, params.height, params).toBuffer();
	}
}
