import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/repository/user.repository';
import { UserDocument } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  async login(user: UserDocument) {
    return this.generateTokens(user);
  }

  async signup(email: string, password: string, username: string) {
    // Check if user already exists
    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    // Check if username is taken
    const existingUsername = await this.userRepository.getByUsername(username);
    if (existingUsername) {
      throw new UnauthorizedException('Username already taken');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });

    // Generate tokens
    return this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // Get user from database
      const user = await this.userRepository.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new tokens
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
