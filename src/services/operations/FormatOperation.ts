import sharp from 'sharp';

import { IImageOperation } from './IImageOperation';
import { ImageParams } from '../../types/index';

export class FormatOperation implements IImageOperation {
	async execute(buffer: Buffer, params: ImageParams): Promise<Buffer> {
		return sharp(buffer).toFormat(params.format).toBuffer();
	}
}
