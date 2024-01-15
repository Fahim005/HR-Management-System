import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from 'src/entities/jobApplication.entity';
import { JobCategories } from 'src/entities/jobCategories.entity';
import { JobRequirments } from 'src/entities/jobRequirments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, JobCategories, JobRequirments])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
