import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface CreateUserData {
  email: string;
  phone: string;
  fullName?: string;
  hashedPassword: string;
}

@Injectable()
export class AuthRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  public async findUserByPhone(phone: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { phone },
    });
  }

  public async createUser(data: CreateUserData): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        fullName: data.fullName,
        password: data.hashedPassword,
      },
    });
  }
}
