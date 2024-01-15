import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { SecureDocument } from "./secureDocument.entity";

@Entity('DocumentTrack')
export class DocumentTrack{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({nullable:false})
    // DocID: number;

    // @Column({nullable:false})
    // UserID: number;

    @ManyToOne(()=> User, user => user.documentTracks, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user : User;

    @ManyToOne(()=> SecureDocument, secureDocument => secureDocument.documentTracks)
    @JoinColumn()
    secureDocument : SecureDocument;

}