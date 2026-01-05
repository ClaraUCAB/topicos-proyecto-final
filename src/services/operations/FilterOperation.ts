import sharp from "sharp";
import { IImageOperation } from "./IImageOperation";

export class FilterOperation implements IImageOperation {
  async execute(buffer: Buffer, params: { filter: "blur" | "sharpen" | "grayscale" }): Promise<Buffer> {
    let img = sharp(buffer);
    switch (params.filter) {
      case "blur":
        img = img.blur();
        break;
      case "sharpen":
        img = img.sharpen();
        break;
      case "grayscale":
        img = img.grayscale();
        break;
    }
    return img.toBuffer();
  }
}