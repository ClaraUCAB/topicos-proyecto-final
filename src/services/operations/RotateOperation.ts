import sharp from "sharp";
import { IImageOperation } from "./IImageOperation";

export class RotateOperation implements IImageOperation {
  async execute(buffer: Buffer, params: { angle: number }): Promise<Buffer> {
    return sharp(buffer).rotate(params.angle).toBuffer();
  }
}