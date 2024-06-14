import { Module } from '@nestjs/common';
import { StatementModule } from '@statement/statement.module';

@Module({
  imports: [StatementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
