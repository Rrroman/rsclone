import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { DbConnectionKey } from 'src/db-connection/db-connection.module';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(@Inject(DbConnectionKey) private db: Db) {}

  private COLLECTION_NAME = 'boards';

  private getCollection() {
    return this.db.collection(this.COLLECTION_NAME);
  }

  async create(createBoardDto: CreateBoardDto): Promise<{ data: Board }> {
    const createdAt = new Date();
    const { ops } = await this.getCollection().insertOne({
      createdAt,
      updatedAt: createdAt,
      ...createBoardDto,
    });

    return { data: ops[0] };
  }

  async findAll(): Promise<{ data: Board[] }> {
    const boards = await this.getCollection().find().toArray();

    return { data: boards };
  }

  async findOne(id: string): Promise<{ data: Board }> {
    const data = await this.getCollection().findOne({ _id: new ObjectId(id) });

    return { data };
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<{ data: Board }> {
    const { value } = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $currentDate: {
          updatedAt: true,
        },
        $set: updateBoardDto,
      },
      { returnOriginal: false },
    );
    return { data: value };
  }

  async remove(id: string) {
    const { deletedCount } = await this.getCollection().deleteOne({
      _id: new ObjectId(id),
    });

    return { data: { deletedCount } };
  }
}
