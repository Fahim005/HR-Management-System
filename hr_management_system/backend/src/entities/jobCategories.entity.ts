import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobApplication } from "./jobApplication.entity";
import { JobRequirments } from "./jobRequirments.entity";
import { UserJobTable } from "./userJobTable.entity";
import { Organization } from "./organization.entity";

@Entity('JobCategories')
export class JobCategories{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    Name: string;

    @ManyToOne(()=> Organization, organization => organization.jobCategoriesTable, { cascade: true, onDelete: 'CASCADE' })
    //@JoinColumn({ name: "OrgID" })
    @JoinColumn()
    organization: Organization;

    @OneToOne(()=> JobApplication, jobApplication => jobApplication.jobCategories)
    jobApplication: JobApplication;

    @OneToOne(()=> JobRequirments, jobRequirments => jobRequirments.jobCategories)
    jobRequirments: JobRequirments;

    @OneToOne(()=> UserJobTable, userJobTable => userJobTable.jobCategory)
    userJobTable: UserJobTable;

}