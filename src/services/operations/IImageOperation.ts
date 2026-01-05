export interface IImageOperation {
  execute(buffer: Buffer, params?: any): Promise<Buffer>;
}
