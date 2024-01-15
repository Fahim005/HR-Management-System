import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { NoticeTrack } from "./noticeTrack.entity";

@Entity('NoticeDescription')
export class NoticeDescription{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    Title: string;

    @Column({nullable:false})
    Description: string;

    @OneToOne(()=> NoticeTrack, noticeTrack => noticeTrack.noticeDescription)
    noticeTrack: NoticeTrack;

}