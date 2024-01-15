import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorization } from 'src/entities/authorization.entity';
import { User } from 'src/entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import { CreateSuperAdminDTO } from './dto/createSuperAdminDTO';
import { CreateOrganizationDTO } from './dto/createOrganizationDTO';
import { Organization } from 'src/entities/organization.entity';
import { JobCategories } from 'src/entities/jobCategories.entity';
import { UserOrganizationTable } from 'src/entities/userOrganizationTable.entity';
import { CreateJobCategoryDTO } from './dto/createJobCategoryDTO';
import { CreateEmployeeDTO } from './dto/createEmployeeDTO';
import { UserJobTable } from 'src/entities/userJobTable.entity';
import { Console } from 'console';
import { LoginDTO } from './dto/loginDTO';
import { UpdateOrganizationDTO } from './dto/updateOrganizationDTO';
import { UpdateSuperAdminDTO } from './dto/updateSuperAdminDTO';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepo: Repository<User>,
        @InjectRepository(Authorization) 
        private readonly authRepo: Repository<Authorization>,
        @InjectRepository(Organization)
        private readonly orgRepo: Repository<Organization>,
        @InjectRepository(JobCategories)
        private readonly jobCategoriesRepo: Repository<JobCategories>,
        @InjectRepository(UserOrganizationTable)
        private readonly userOrganizationTableRepo: Repository<UserOrganizationTable>,
        @InjectRepository(UserJobTable)
        private readonly userJobTableRepo: Repository<UserJobTable>,
        private jwtService: JwtService
        ){}

        async createSuperAdmin(createUserDTO: CreateSuperAdminDTO){
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(createUserDTO.Password, salt);
            
            const user1 = {
                Name: createUserDTO.Name,
                Email: createUserDTO.Email,
                Gender: createUserDTO.Gender,
                DOB: createUserDTO.DOB,
                PhoneNum: createUserDTO.PhoneNum,
                Password: hashedPass
            }
            const user = await this.userRepo.save(user1);
            const auth1 = {
                role: "Super_Admin",
                user: user
            }

            const auth = await this.authRepo.save(auth1);
            //await this.userRepo.save(user);
            //await this.authRepo.save(auth);
            return true;
        }

        async updateSuperAdmin(id: number, updateSuperAdminDTO: UpdateSuperAdminDTO){
            return await this.userRepo.update(id, updateSuperAdminDTO);
        }

        async deleteUser(id: number){
            return await this.userRepo.delete(id);
        }

        async showProfile(id: number){
            return await this.userRepo.findOne({where: {id: id}});
        }

        async allSuperAdmin(){
            // const auth = this.authRepo.findOne({where: {role: 'Super_Admin'}});
            // return await this.userRepo.find({where: {authorization : auth}})
            return await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.authorization', 'authorization')
      .where('authorization.role = :role', { role: 'Super_Admin' })
      .getMany();
        }

        async createOrganization(createOrganizationDTO: CreateOrganizationDTO){
            const salt = await bcrypt.genSalt();
            createOrganizationDTO.Password = await bcrypt.hash(createOrganizationDTO.Password, salt);

            const org = await this.orgRepo.create(createOrganizationDTO);
            return await this.orgRepo.save(org);
        }

        async updateOrganization(id: number , updateOrganizationDTO: UpdateOrganizationDTO){
            return await this.orgRepo.update(id, updateOrganizationDTO);
        }

        async deleteOrganization(id: number){
            return await this.orgRepo.delete(id);
        }

        async createJobCategory(createJobCategoryDTO: CreateJobCategoryDTO){
            const org = await this.orgRepo.findOne({where: {id: createJobCategoryDTO.OrgID}});
            const jobCat = {
                Name: createJobCategoryDTO.Name,
                organization: org
            }
            const jobCategory = await this.jobCategoriesRepo.create(jobCat);
            return await this.jobCategoriesRepo.save(jobCategory);
        }

        async createEmployee(createEmployeeDTO: CreateEmployeeDTO){
            
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(createEmployeeDTO.Password, salt);

            const user1 = {
                Name: createEmployeeDTO.Name,
                Email: createEmployeeDTO.Email,
                Gender: createEmployeeDTO.Gender,
                DOB: createEmployeeDTO.DOB,
                PhoneNum: createEmployeeDTO.PhoneNum,
                Password: hashedPass
            }
            //const user = await this.userRepo.create(user1);
            const user = await this.userRepo.save(user1);

            const auth1 = {
                role: "Employee",
                user: user
            }

            const auth = await this.authRepo.save(auth1);

            const jobCategory = await this.jobCategoriesRepo.findOne({where: {Name: createEmployeeDTO.JobCategory}})
            //console.log(jobCategory);

            const userJob = {
                user: user,
                jobCategory: jobCategory
            }

            //const userJobTable = await this.userJobTableRepo.create(userJob);
            const userJobTable = await this.userJobTableRepo.save(userJob);

            const org = await this.orgRepo.findOne({where: {id: createEmployeeDTO.OrgID}});

            const userOrg = {
                user: user,
                organization: org
            }

            //const userOrganizationTable = await this.userOrganizationTableRepo.create(userOrg);
            const userOrganizationTable = await this.userOrganizationTableRepo.save(userOrg);

            //await this.userOrganizationTableRepo.save(userOrganizationTable);
            //await this.userJobTableRepo.save(userJobTable);
            return true;
        }


        async createManager(createManagerDTO: CreateEmployeeDTO){

            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(createManagerDTO.Password, salt);


            const user1 = {
                Name: createManagerDTO.Name,
                Email: createManagerDTO.Email,
                Gender: createManagerDTO.Gender,
                DOB: createManagerDTO.DOB,
                PhoneNum: createManagerDTO.PhoneNum,
                Password: hashedPass
            }
            
            const user = await this.userRepo.save(user1);

            const auth1 = {
                role: "Manager",
                user: user
            }

            const auth = await this.authRepo.save(auth1);

            const jobCategory = await this.jobCategoriesRepo.findOne({where: {Name: createManagerDTO.JobCategory}})

            const userJob = {
                user: user,
                jobCategory: jobCategory
            }

            const userJobTable = await this.userJobTableRepo.save(userJob);

            const org = await this.orgRepo.findOne({where: {id: createManagerDTO.OrgID}});

            const userOrg = {
                user: user,
                organization: org
            }

            const userOrganizationTable = await this.userOrganizationTableRepo.save(userOrg);

            // const organizationId =1;

            // const usersForOrganization = await this.userOrganizationTableRepo.find({where: {organization: org}, relations: {user: true}});

            // console.log(usersForOrganization);

            return "Manager Created";
        }

        async getUserFromId(userId: number){
            return await this.userRepo.findOne({where: {id: userId}});
        }

        async login(loginDTO: LoginDTO){
            const user = await this.userRepo.findOne({where: {Email: loginDTO.Email}, relations: {authorization: true}});
            //console.log(user);
            //console.log(user);
            // if(user.Password !== loginDTO.Password){
            //     throw new UnauthorizedException();
            //     //return user;
            // }
            console.log(user);
            const isMatch = await bcrypt.compare(loginDTO.Password, user.Password);
            console.log(isMatch);
            if(!isMatch){
                throw new UnauthorizedException();
            }

            const playload = { sub: user.id, username: user.Name };
            //console.log(playload);
            const token = await this.jwtService.sign(playload);
            //console.log(token);
            return {
                access_token: token,
                role: user.authorization.role
            };
            
        }



        async loginOrganization(loginDTO: LoginDTO){
            const user = await this.orgRepo.findOne({where: {Email: loginDTO.Email}});

            //console.log(user);
            const isMatch = await bcrypt.compare(loginDTO.Password, user.Password);
            // if(user.Password == loginDTO.Password){
            //     return "Logged In";
            // }
            if(!isMatch){
                throw new UnauthorizedException();
            }

            return user.id;
        }

        async findOrg(id: number){
            const org = await this.orgRepo.findOne({where: {id: id}});
            return org;
        }

        async allJobCategories(id: number){
            const org = await this.orgRepo.findOne({where: {id: id}});
            const jobCat = await this.jobCategoriesRepo.find({where: {organization: org}});
            return jobCat;
        }

        async getAllManagers(id: number) {
            const jobCategoryName = 'Manager';
          
            const users = await this.userRepo
              .createQueryBuilder('user')
              .innerJoin('user.userOrganizationTable', 'userOrg')
              .innerJoin('userOrg.organization', 'organization')
              .innerJoin('user.userJobTable', 'userJob')
              .innerJoin('userJob.jobCategory', 'jobCategory')
              .where('organization.id = :organizationId', { organizationId: id })
              .andWhere('jobCategory.Name = :jobCategoryName', { jobCategoryName: jobCategoryName })
              .getMany();
          
            return users;
          }

          async getEmployeeDetails(id: number){
            const user = await this.userRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userOrganizationTable', 'userOrg')
            .leftJoinAndSelect('userOrg.organization', 'organization')
            .where('user.id = :userId', { userId: id })
            .getOne();

            return user;
          }

          async getAllEmployees(id: number) {
            const jobCategoryName = 'Manager';
          
            const users = await this.userRepo
              .createQueryBuilder('user')
              .innerJoin('user.userOrganizationTable', 'userOrg')
              .innerJoin('userOrg.organization', 'organization')
              .where('organization.id = :organizationId', { organizationId: id })
              .getMany();
          
            return users;
          }
          
          


}
