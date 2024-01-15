import { Body, Controller, Get, Post, Put,  Param, UseGuards, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobRequirmentsDTO } from './dto/createJobRequirmentsDTO';
import { UpdateJobRequirmentsDTO } from './dto/updateJobRequirmentsDTO';
import { CreateJobApplicationDTO } from './dto/createJobApplicationDTO';
import { JwtGuard } from 'src/auth/guards';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  //@UseGuards(JwtGuard)
  @Post('createPost')
  createPost(@Body() jobRequirmentsDTO : CreateJobRequirmentsDTO){
    return this.jobService.createPost(jobRequirmentsDTO);
  }

  @Get('showJobPost/:id')
  showJobPost(@Param('id') id: number){
    return this.jobService.showJobPost(id);
  }

  @Delete('deleteJobPost/:id')
  deleteJobPost(@Param('id') id: number){
    return this.jobService.deleteJobPost(id);
  }

  //@UseGuards(JwtGuard)
  @Put('updateJobPost/:id')
  updateJobPost(@Param('id') id: number, @Body() updateJobRequirmentsDTO: UpdateJobRequirmentsDTO){
    return this.jobService.updateJobPost(id, updateJobRequirmentsDTO);
  }


  //@UseGuards(JwtGuard)
  @Get('showAllJobPost')
  showAllJobPost(){
    return this.jobService.showAllJobPost();
  }

  //@UseGuards(JwtGuard)
  @Post('createJobApplication')
  createJobApplication(@Body() createJobApplicationDTO: CreateJobApplicationDTO){
    return this.jobService.createJobApplication(createJobApplicationDTO);
  }

  @UseGuards(JwtGuard)
  @Get('showAllJobApplication')
  showAllJobApplication(){
    return this.jobService.showAllJobApplication();
  }

  //@UseGuards(JwtGuard)
  @Get('showJobApplication/:id')
  showJobApplication(@Param('id') id: number){
    return this.jobService.showJobApplication(id);
  }

 //@UseGuards(JwtGuard)
  @Get('makeShortListed/:id')
  makeShortListed(@Param('id') id: number){
    return this.jobService.makeShortListed(id);
  }

  //@UseGuards(JwtGuard)
  @Get('showAllShortListed')
  showAllShortListed(){
    return this.jobService.showAllShortListed();
  }

  //@UseGuards(JwtGuard)
  @Get('makeSelected/:id')
  makeSelected(@Param('id') id: number){
    return this.jobService.makeSelected(id);
  }

  //@UseGuards(JwtGuard)
  @Get('showAllSelected')
  showAllSelected(){
    return this.jobService.showAllSelected();
  }

  @Get('showAllAvailableJobApplication')
  showAllAvailableJobApplication(){
    return this.jobService.showAllAvailableJobApplication();
  }

  
}
