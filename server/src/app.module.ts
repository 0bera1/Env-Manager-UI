import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { EnvironmentModule } from './modules/environment/environment.module';
import { ProjectModule } from './modules/project/project.module';
import { VariableModule } from './modules/variable/variable.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectModule,
    EnvironmentModule,
    VariableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
