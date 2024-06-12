import { AccountModule } from '@account/account.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AccountModule],
})
export class AppModule {}
