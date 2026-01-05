import sharp from "sharp";
import { IImageOperation } from "./IImageOperation";

export class ResizeOperation implements IImageOperation {
  async execute(buffer: Buffer, params: { width: number; height: number; fit?: keyof sharp.FitEnum }): Promise<Buffer> {
    return sharp(buffer).resize(params.width, params.height, { fit: params.fit }).toBuffer();
  }
}