import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { IStorage } from './storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_KEY ?? '',
    );
  }
  async upload(file: Express.Multer.File, folder: string): Promise<any> {
    const data = await this.client.storage
      .from(process.env.SUPABASE_NAME ?? '')
      .upload(`${folder}/` + file.originalname, file.buffer, {
        upsert: true,
      });

    console.log(data);

    return data;
  }
}
