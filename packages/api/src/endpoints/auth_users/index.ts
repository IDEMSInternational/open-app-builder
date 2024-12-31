import { AuthUsersController } from './auth_user.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthUsersController],
})
export class AuthUsersModule {}