import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeDescription } from 'src/entities/noticeDescription.entity';
import { NoticeTrack } from 'src/entities/noticeTrack.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNoticeDTO } from './dto/createNoticeDTO';

@Injectable()
export class NoticeboardService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(NoticeDescription)
        private readonly noticeDescriptionRepo: Repository<NoticeDescription>,
        @InjectRepository(NoticeTrack)
        private readonly noticeTrackRepo: Repository<NoticeTrack>,
    ){}

    async createNotice(createNoticeDTO : CreateNoticeDTO){
        const fromUser = await this.userRepo.findOne({where: {id: createNoticeDTO.SendFromUserId}});
        const toUser = await this.userRepo.findOne({where: {id: createNoticeDTO.SendToUserId}});

        const notice = {
            Title: createNoticeDTO.Title,
            Description: createNoticeDTO.Description,
        }

        const noticeDescription = await this.noticeDescriptionRepo.save(notice);

        const noticeTrack = {
            noticeDescription : notice,
            sendFromUser : fromUser,
            sendToUser : toUser,
            Status : "Unseen"
        }

        return await this.noticeTrackRepo.save(noticeTrack);
    }

    async viewNotice(id: number){
        const notice =  await this.noticeDescriptionRepo.findOne({where: {id: id}, relations: {noticeTrack: true}});

        const update = {
            Status : "Seen"
        }

        await this.noticeTrackRepo.update(notice.noticeTrack.id, update);

        return notice;

    }

    async viewAllNotice(id: number){
        return await this.noticeTrackRepo.find({where: {SendToUserID: id}, relations: {noticeDescription: true}});
    }

    async trackAllNotice(id: number){
        return await this.noticeTrackRepo.find({where: {SendFromUserID: id}, relations: {noticeDescription: true}});
    }
}
