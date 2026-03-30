import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export interface CreateUserData {
    email: string;
    phone: string;
    fullName?: string;
    hashedPassword: string;
}
export declare class AuthRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUserByEmail(email: string): Promise<User | null>;
    findUserByPhone(phone: string): Promise<User | null>;
    createUser(data: CreateUserData): Promise<User>;
}
