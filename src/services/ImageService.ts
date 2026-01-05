import sharp from "sharp";

export class ImageService {

  private async getOriginalFormat(buffer: Buffer): Promise<string> {
    const metadata = await sharp(buffer).metadata();
    return metadata.format || "png"; 
  }

  async resize(buffer: Buffer, width: number, height: number, fit?: keyof sharp.FitEnum): Promise<Buffer> {
    const format = await this.getOriginalFormat(buffer);
    return sharp(buffer)
      .resize({ width, height, fit })
      .toFormat(format as any)
      .toBuffer();
  }

  async crop(buffer: Buffer, left: number, top: number, width: number, height: number): Promise<Buffer> {
    const format = await this.getOriginalFormat(buffer);
    const metadata = await sharp(buffer).metadata();
    const imgWidth = metadata.width ?? null;
    const imgHeight = metadata.height ?? null;

    const l = Math.trunc(left);
    const t = Math.trunc(top);
    const w = Math.trunc(width);
    const h = Math.trunc(height);

    if (l < 0 || t < 0 || w <= 0 || h <= 0) {
      throw new Error("Parámetros inválidos para crop: valores deben ser enteros y positivos");
    }

    if ((imgWidth !== null && l + w > imgWidth) || (imgHeight !== null && t + h > imgHeight)) {
      throw new Error("Área de recorte fuera de los límites de la imagen");
    }

    return sharp(buffer)
      .extract({ left: l, top: t, width: w, height: h })
      .toFormat(format as any)
      .toBuffer();
  }

  async format(buffer: Buffer, format: "jpeg" | "png" | "webp"): Promise<Buffer> {
    return sharp(buffer).toFormat(format).toBuffer();
  }

  async rotate(buffer: Buffer, angle: number): Promise<Buffer> {
    const format = await this.getOriginalFormat(buffer);
    return sharp(buffer)
      .rotate(angle)
      .toFormat(format as any)
      .toBuffer();
  }

  async filter(buffer: Buffer, filter: "blur" | "sharpen" | "grayscale"): Promise<Buffer> {
    const format = await this.getOriginalFormat(buffer);
    let img = sharp(buffer);
    switch (filter) {
      case "blur": img = img.blur(); break;
      case "sharpen": img = img.sharpen(); break;
      case "grayscale": img = img.grayscale(); break;
    }
    return img.toFormat(format as any).toBuffer();
  }

  async pipeline(buffer: Buffer, operations: Array<{ type: string; params?: any }>): Promise<{ buffer: Buffer; format: string }> {
    let img = sharp(buffer);
    let format = await this.getOriginalFormat(buffer);
    const metadata = await sharp(buffer).metadata();
    const imgWidth = metadata.width ?? null;
    const imgHeight = metadata.height ?? null;

    for (const op of operations) {
      switch (op.type) {
        case "resize":
          img = img.resize(op.params?.width, op.params?.height, { fit: op.params?.fit });
          break;
        case "crop":
          {
            const l = Math.trunc(op.params?.left ?? NaN);
            const t = Math.trunc(op.params?.top ?? NaN);
            const w = Math.trunc(op.params?.width ?? NaN);
            const h = Math.trunc(op.params?.height ?? NaN);

            if (!Number.isFinite(l) || !Number.isFinite(t) || !Number.isFinite(w) || !Number.isFinite(h) || l < 0 || t < 0 || w <= 0 || h <= 0) {
              throw new Error("Parámetros inválidos para crop en pipeline");
            }

            if ((imgWidth !== null && l + w > imgWidth) || (imgHeight !== null && t + h > imgHeight)) {
              throw new Error("Área de recorte fuera de los límites de la imagen en pipeline");
            }

            img = img.extract({ left: l, top: t, width: w, height: h });
          }
          break;
        case "rotate":
          img = img.rotate(op.params?.angle);
          break;
        case "filter":
          if (op.params?.filter === "blur") img = img.blur();
          else if (op.params?.filter === "sharpen") img = img.sharpen();
          else if (op.params?.filter === "grayscale") img = img.grayscale();
          break;
        case "format":
          format = op.params?.format;
          img = img.toFormat(format);
          break;
        default:
          throw new Error(`Operación desconocida: ${op.type}`);
      }
    }

    const bufferResult = await img.toFormat(format as any).toBuffer();
    return { buffer: bufferResult, format };
  }
}
