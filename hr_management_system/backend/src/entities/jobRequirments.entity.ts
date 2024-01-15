import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { JobCategories } from "./jobCategories.entity";

@Entity('JobRequirments')
export class JobRequirments{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    Title: string;

    @Column({nullable:false})
    Description: string;

    // @Column({nullable:false})
    // JobID: number;

    @Column({nullable:false})
    SubmissionDate: Date;

    @Column({nullable:false})
    CloseDate: Date;

    @Column({nullable:false})
    Status: string;

    @ManyToOne(()=> JobCategories, jobCategories => jobCategories.jobApplication)
    @JoinColumn()
    jobCategories: JobCategories;

}