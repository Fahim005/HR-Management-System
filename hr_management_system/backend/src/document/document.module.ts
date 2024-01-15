import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SecureDocument } from 'src/entities/secureDocument.entity';
import { DocumentTrack } from 'src/entities/documentTrack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SecureDocument, DocumentTrack])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
