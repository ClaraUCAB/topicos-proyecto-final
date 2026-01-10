import sharp from 'sharp';
import { IImageOperation } from './IImageOperation';

export class CropOperation implements IImageOperation {
	async execute(
		buffer: Buffer,
		params: { left: number; top: number; width: number; height: number },
	): Promise<Buffer> {
		return sharp(buffer).extract(params).toBuffer();
	}
}
