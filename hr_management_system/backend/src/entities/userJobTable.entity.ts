import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, Unique, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { JobCategories } from "./jobCategories.entity";

@Entity('UserJobTable')
export class UserJobTable{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({nullable:false})
    // userId: number;

    // @Column({nullable:false})
    // jobCategoryId: number;

    @ManyToOne(()=> User, user => user.userJobTable, { cascade: true, onDelete: 'CASCADE' })
    //@JoinColumn({ name: "userId" })
    @JoinColumn()
    user: User;

    @ManyToOne(()=> JobCategories, jobCategories => jobCategories.userJobTable, { cascade: true, onDelete: 'CASCADE' })
    //@JoinColumn({ name: "jobCategoryId" })
    @JoinColumn()
    jobCategory: JobCategories;

}