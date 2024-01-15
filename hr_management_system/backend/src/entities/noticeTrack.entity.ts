import { Column, Entity, PrimaryGeneratedColumn, OneToOne,  JoinColumn, ManyToOne} from "typeorm";
import { NoticeDescription } from "./noticeDescription.entity";
import { User } from "./user.entity";

@Entity('NoticeTrack')
export class NoticeTrack{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({nullable:false})
    // NoticeID: number;

    @Column()
    SendFromUserID: number;

    @Column()
    SendToUserID: number;

    @Column({nullable:false})
    Status: string;

    @OneToOne(()=> NoticeDescription, NoticeDescription => NoticeDescription.noticeTrack)
    @JoinColumn()
    noticeDescription: NoticeDescription;

    @ManyToOne(()=> User, User => User.noticeTrackFromUser, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "SendFromUserID" })
    sendFromUser: User;

    @ManyToOne(()=> User, User => User.noticeTrackToUser, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "SendToUserID" })
    sendToUser: User;


}