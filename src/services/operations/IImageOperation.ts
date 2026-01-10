import { ImageParams } from '../../types/index';

export interface IImageOperation {
	execute(buffer: Buffer, params: Params): Promise<Buffer>;
}
