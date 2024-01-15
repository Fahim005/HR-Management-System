import { Module } from '@nestjs/common';
import { NoticeboardService } from './noticeboard.service';
import { NoticeboardController } from './noticeboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { NoticeDescription } from 'src/entities/noticeDescription.entity';
import { NoticeTrack } from 'src/entities/noticeTrack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, NoticeDescription, NoticeTrack])],
  controllers: [NoticeboardController],
  providers: [NoticeboardService],
})
export class NoticeboardModule {}
