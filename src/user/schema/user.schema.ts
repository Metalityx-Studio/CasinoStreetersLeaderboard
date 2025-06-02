import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment-timezone';
import { BaseDocument } from '../../common/repositories/base.repository';

@Schema({ collection: 'users' })
export class User {
  @Prop({ default: null })
  name?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: false, index: true })
  is_deleted: boolean;

  @Prop({ default: null })
  deleted_at?: number;

  @Prop({ default: () => moment().unix() })
  created_at: number;

  @Prop({ default: () => moment().unix() })
  updated_at: number;
}

export type UserDocument = User & Document & BaseDocument;

export const UserSchema = SchemaFactory.createForClass(User);

// Create compound indexes for better query performance
UserSchema.index({ is_deleted: 1, email: 1 });
UserSchema.index({ is_deleted: 1, username: 1 });
