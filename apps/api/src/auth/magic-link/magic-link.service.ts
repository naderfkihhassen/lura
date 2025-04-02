/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MagicLinkService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  // Generate a unique token for magic link
  async generateToken(email: string): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token expires in 1 hour

    // Store the token in the database
    await this.prisma.magicLink.upsert({
      where: { email },
      update: {
        token,
        expires,
      },
      create: {
        email,
        token,
        expires,
      },
    });

    return token;
  }

  // Verify a magic link token
  async verifyToken(
    token: string,
  ): Promise<{ email: string; isValid: boolean }> {
    const magicLink = await this.prisma.magicLink.findUnique({
      where: { token },
    });

    if (!magicLink) {
      return { email: null, isValid: false };
    }

    const now = new Date();
    const isValid = magicLink.expires > now;

    if (isValid) {
      // Delete the token after use
      await this.prisma.magicLink.delete({
        where: { token },
      });
    }

    return { email: magicLink.email, isValid };
  }

  // Simulate sending an email with the magic link
  async sendMagicLinkEmail(email: string, token: string): Promise<void> {
    // In a real application, you would send an actual email here
    const backendUrl = this.configService.get(
      'BACKEND_URL',
      'http://localhost:8000',
    );
    console.log(
      `Magic link for ${email}: ${backendUrl}/auth/verify-magic-link?token=${token}`,
    );

    // For development, we'll just log the link
    // In production, you would use a service like SendGrid, Mailgun, etc.
  }
}
