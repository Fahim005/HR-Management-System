import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Authorization } from "./authorization.entity";
import { DocumentTrack } from "./documentTrack.entity";
import { UserJobTable } from "./userJobTable.entity";
import { UserOrganizationTable } from "./userOrganizationTable.entity";
import { NoticeTrack } from "./noticeTrack.entity";

@Entity('Users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    Name: string;

    @Column({nullable:false})
    Email: string;

    @Column({nullable:false})
    Gender: string;

    @Column({nullable:false})
    DOB: Date;

    @Column({nullable:false})
    PhoneNum: string;

    @Column({nullable:false})
    Password: string;

    @OneToOne(()=> Authorization, authorization => authorization.user)
    authorization: Authorization;

    @OneToMany(()=> DocumentTrack, documentTrack => documentTrack.user)
    documentTracks: DocumentTrack[];

    @OneToOne(()=> UserJobTable, userJobTable => userJobTable.user)
    userJobTable: UserJobTable;

    @OneToOne(()=> UserOrganizationTable, userOrganizationTable => userOrganizationTable.user)
    userOrganizationTable: UserOrganizationTable;

    @OneToMany(()=> NoticeTrack, NoticeTrack => NoticeTrack.sendFromUser)
    noticeTrackFromUser: NoticeTrack[];

    @OneToMany(()=> NoticeTrack, NoticeTrack => NoticeTrack.sendToUser)
    noticeTrackToUser: NoticeTrack[];

}