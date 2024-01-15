import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from 'src/entities/jobApplication.entity';
import { JobCategories } from 'src/entities/jobCategories.entity';
import { JobRequirments } from 'src/entities/jobRequirments.entity';
import { Repository } from 'typeorm';
import { CreateJobRequirmentsDTO } from './dto/createJobRequirmentsDTO';
import { UpdateJobRequirmentsDTO } from './dto/updateJobRequirmentsDTO';
import { CreateJobApplicationDTO } from './dto/createJobApplicationDTO';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobRequirments)
        private readonly jobRequirmentsRepo: Repository<JobRequirments>,
        @InjectRepository(JobCategories)
        private readonly jobCategoriesRepo: Repository<JobCategories>,
        @InjectRepository(JobApplication)
        private readonly jobApplicationRepo: Repository<JobApplication>,
    ){}

    async createPost(jobRequirmentsDTO : CreateJobRequirmentsDTO){
        const jobCat = await this.jobCategoriesRepo.findOne({where: {id: jobRequirmentsDTO.JobId}});

        const jobRequirments = {
            Title: jobRequirmentsDTO.Title,
            Description: jobRequirmentsDTO.Description,
            SubmissionDate: jobRequirmentsDTO.SubmissionDate,
            CloseDate: jobRequirmentsDTO.CloseDate,
            Status: jobRequirmentsDTO.Status,
            jobCategories: jobCat
        }
        return await this.jobRequirmentsRepo.save(jobRequirments); 
    }

    async showJobPost(id: number){
        return await this.jobRequirmentsRepo.findOne({where: {id: id}});
    }

    async deleteJobPost(id: number){
        return await this.jobRequirmentsRepo.delete(id);
    }

    async updateJobPost(id: number, updateJobRequirmentsDTO: UpdateJobRequirmentsDTO){
        return await this.jobRequirmentsRepo.update(id, updateJobRequirmentsDTO);
    }

    async showAllJobPost(){
        return await this.jobRequirmentsRepo.find();
    }

    async createJobApplication(createJobApplicationDTO: CreateJobApplicationDTO){
        const jobCat = await this.jobCategoriesRepo.findOne({where: {id: createJobApplicationDTO.JobId}});

        const jobApplication = {
            Name: createJobApplicationDTO.Name,
            Email: createJobApplicationDTO.Email,
            PhoneNo: createJobApplicationDTO.PhoneNo,
            Address: createJobApplicationDTO.Address,
            UploadFileName: createJobApplicationDTO.UploadFileName,
            Status: "Submitted",
            jobCategories: jobCat
        }

        return this.jobApplicationRepo.save(jobApplication);
    }

    async showAllJobApplication(){
        return await this.jobApplicationRepo.find();
    }

    async showJobApplication(id: number){
        return await this.jobApplicationRepo.findOne({where: {id: id}});
    }

    async makeShortListed(id: number){
        const jobApplication = {
            "Status" : "Shortlisted"
        }

        return await this.jobApplicationRepo.update(id, jobApplication);
    }

    async showAllShortListed(){
        return await this.jobApplicationRepo.find({where: {Status: "Shortlisted"}});
    }

    async makeSelected(id: number){
        const jobApplication = {
            "Status" : "Selected"
        }

        return await this.jobApplicationRepo.update(id, jobApplication);
    }

    async showAllSelected(){
        return await this.jobApplicationRepo.find({where: {Status: "Selected"}});
    }

    async showAllAvailableJobApplication(){
        return await this.jobRequirmentsRepo.find({where: {Status: "Open"}});
    }

    
}
