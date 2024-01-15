import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentTrack } from 'src/entities/documentTrack.entity';
import { SecureDocument } from 'src/entities/secureDocument.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { DocumentUploadDTO } from './dto/documentUploadDTO';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(DocumentTrack)
        private readonly documentTrackRepo: Repository<DocumentTrack>,
        @InjectRepository(SecureDocument)
        private readonly secureDocumentRepo: Repository<SecureDocument>,
    ){}

    async uploadDocument(documentUploadDTO : DocumentUploadDTO){
        const document = {
            DocumentName : documentUploadDTO.DocumentName
        }

        const uploaded = await this.secureDocumentRepo.save(document);

        const user = await this.userRepo.findOne({where: {id: documentUploadDTO.userID}});

        const docTrack = {
            user : user,
            secureDocument : uploaded
        }

        await this.documentTrackRepo.save(docTrack);
        return "Document Uploaded";
    }
}
