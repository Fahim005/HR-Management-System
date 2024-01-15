import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DocumentTrack } from "./documentTrack.entity";

@Entity('SecureDocuments')
export class SecureDocument{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    DocumentName: string;

    @OneToMany(()=> DocumentTrack, documentTrack => documentTrack.secureDocument)
    documentTracks: DocumentTrack[];

}