export abstract class IStorage {
  abstract upload(file: Express.Multer.File, folder: string): Promise<string>;
}
