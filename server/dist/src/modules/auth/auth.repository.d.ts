import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUserByEmail(email: string): Promise<User | null>;
    createUser(email: string, hashedPassword: string): Promise<User>;
}
