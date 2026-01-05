import sharp from "sharp";
import { IImageOperation } from "./IImageOperation";

export class FormatOperation implements IImageOperation {
  async execute(buffer: Buffer, params: { format: "jpeg" | "png" | "webp" }): Promise<Buffer> {
    return sharp(buffer).toFormat(params.format).toBuffer();
  }
}
