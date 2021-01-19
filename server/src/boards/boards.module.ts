import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { DbConnection } from 'src/db-connection/db-connection.module';

@Module({
  imports: [DbConnection],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
