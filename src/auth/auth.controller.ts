import {
  Controller,
  Post,
  Body,
  UseGuards,
  Version,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  LoginDto,
  SignupDto,
  TokensResponseDto,
  ProfileResponseDto,
  RefreshTokenDto,
} from './dto/auth.dto';

@Controller({ version: '1', path: 'auth' })
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: TokensResponseDto })
  async signup(@Body() signupDto: SignupDto) {
    const tokens = await this.authService.signup(
      signupDto.email,
      signupDto.password,
      signupDto.username,
    );

    return { ...tokens, message: 'Signup Successful.' };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, type: TokensResponseDto })
  async login(@Body() loginDto: LoginDto, @Request() req) {
    // After LocalAuthGuard validates credentials, Passport adds the user to req.user
    const tokens = await this.authService.login(req.user);

    return { ...tokens, message: 'Login Successful.' };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, type: TokensResponseDto })
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshTokens(
      refreshTokenDto.refresh_token,
    );

    return { ...tokens, message: 'Tokens Refreshed Successfully.' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async getProfile(@Request() req) {
    // Remove internal fields from the user object
    const { __v, is_deleted, deleted_at, ...profile } = req.user;
    return { user: profile, message: 'Profile Fetched Successfully.' };
  }
}
