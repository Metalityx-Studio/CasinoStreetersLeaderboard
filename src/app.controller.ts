import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a welcome message',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'null' },
        message: { type: 'string' },
      },
    },
  })
  getHello() {
    return {
      message: 'Welcome to Streeters Casino API!',
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Get API health status' })
  @ApiResponse({
    status: 200,
    description: 'Returns the API health status',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
  })
  getHealth() {
    return {
      message: 'Streeters Casino API is running',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
