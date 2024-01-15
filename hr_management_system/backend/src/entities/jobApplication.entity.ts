import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { JobCategories } from "./jobCategories.entity";

@Entity('JobApplications')
export class JobApplication{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    Name: string;

    @Column({nullable:false})
    Email: string;

    @Column({nullable:false})
    PhoneNo: string;

    @Column({nullable:true})
    Address: string;

    @Column({nullable:false})
    UploadFileName: string;

    // @Column({nullable:false})
    // JobID: number;

    @Column({nullable:false})
    Status: string;

    @ManyToOne(()=> JobCategories, jobCategories => jobCategories.jobApplication)
    @JoinColumn()
    jobCategories: JobCategories;

}