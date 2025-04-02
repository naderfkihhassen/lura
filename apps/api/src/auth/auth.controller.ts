import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { MagicLinkService } from './magic-link/magic-link.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private magicLinkService: MagicLinkService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post('request-magic-link')
  async requestMagicLink(@Body() body: { email: string; name?: string }) {
    const { email, name } = body;

    // Create user if they don't exist
    await this.authService.findOrCreateUser(email, name);

    // Generate a magic link token
    const token = await this.magicLinkService.generateToken(email);

    // Send the magic link via email
    await this.magicLinkService.sendMagicLinkEmail(email, token);

    return { message: 'Magic link sent to your email' };
  }

  @Public()
  @Get('verify-magic-link')
  async verifyMagicLink(@Query('token') token: string, @Res() res: Response) {
    const { email, isValid } = await this.magicLinkService.verifyToken(token);

    if (!isValid) {
      const frontendUrl = this.configService.get('FRONTEND_URL');
      return res.redirect(`${frontendUrl}/auth/invalid-link`);
    }

    // Get or create the user
    const user = await this.authService.findOrCreateUser(email);

    // Generate tokens
    const authTokens = await this.authService.login(
      user.id,
      user.name,
      user.role,
    );

    // Redirect to frontend with tokens
    const frontendUrl = this.configService.get('FRONTEND_URL');
    return res.redirect(
      `${frontendUrl}/api/auth/magic-link/callback?userId=${authTokens.id}&name=${authTokens.name}&accessToken=${authTokens.accessToken}&refreshToken=${authTokens.refreshToken}&role=${authTokens.role}`,
    );
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res: Response) {
    // Check if there's an error parameter in the query (user canceled auth)
    if (req.query.error) {
      const frontendUrl = this.configService.get('FRONTEND_URL');
      return res.redirect(
        `${frontendUrl}/auth/signin?error=${req.query.error}`,
      );
    }

    // If no error, proceed with login
    const response = await this.authService.login(
      req.user.id,
      req.user.name,
      req.user.role,
    );
    const frontendUrl = this.configService.get('FRONTEND_URL');

    res.redirect(
      `${frontendUrl}/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&role=${response.role}`,
    );
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    const userId = req.user.id;
    const name = req.user.name || 'User';
    return this.authService.refreshToken(userId, name);
  }

  @Roles('ADMIN', 'EDITOR')
  @Get('protected')
  getAll(@Req() req) {
    return {
      message: `Now you can access this protected API. This is your user ID: ${req.user.id}`,
    };
  }

  @Post('signout')
  signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }
}
