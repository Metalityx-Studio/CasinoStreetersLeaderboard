import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/repositories/base.repository';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async getByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({
      email,
      is_deleted: false,
    });
  }

  async getByUsername(username: string): Promise<UserDocument | null> {
    return this.findOne({
      username,
      is_deleted: false,
    });
  }
}
