import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'error_logs' })
export class ErrorLog extends Document {
  @Prop()
  message: string;

  @Prop()
  stack: string;

  @Prop()
  path: string;

  @Prop()
  timestamp: Date;
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
