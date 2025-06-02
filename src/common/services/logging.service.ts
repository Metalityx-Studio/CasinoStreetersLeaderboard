import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorLog } from '../schemas/error-log.schema';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLog>,
  ) {}

  async logError(error: any, path: string) {
    const errorLog = new this.errorLogModel({
      message: error.message,
      stack: error.stack,
      path: path,
      timestamp: new Date(),
    });
    await errorLog.save();
  }
}
