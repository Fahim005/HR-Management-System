import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('Authorizations')
export class Authorization{
    @PrimaryGeneratedColumn()
    id: number;

    //userID: number;

    @Column({nullable:false})
    role: string;

    @OneToOne(()=> User, user => user.authorization, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

}