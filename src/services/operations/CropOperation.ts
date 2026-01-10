import sharp from 'sharp';
import { IImageOperation } from './IImageOperation';
import { ImageParams } from '../../types/index';

export class CropOperation implements IImageOperation {
	async execute(buffer: Buffer, params: ImageParams): Promise<Buffer> {
		return sharp(buffer).extract(params).toBuffer();
	}
}
