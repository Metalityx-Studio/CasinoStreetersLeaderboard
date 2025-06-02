import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Name {
  @Prop()
  full_name?: string;
}
