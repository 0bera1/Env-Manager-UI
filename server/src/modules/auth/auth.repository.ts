import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  public async createUser(email: string, hashedPassword: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
