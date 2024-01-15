import { Controller, Post, Body, Put, Param, Delete, Get, Res, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSuperAdminDTO } from './dto/createSuperAdminDTO';
import { CreateOrganizationDTO } from './dto/createOrganizationDTO';
import { CreateJobCategoryDTO } from './dto/createJobCategoryDTO';
import { CreateEmployeeDTO } from './dto/createEmployeeDTO';
import { LoginDTO } from './dto/loginDTO';
import { UpdateOrganizationDTO } from './dto/updateOrganizationDTO';
import { UpdateSuperAdminDTO } from './dto/updateSuperAdminDTO';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
    ) {
  }

  @UseGuards(JwtGuard)
  @Post('createSuperAdmin')
  createSuperAdmin(@Body() createUserDTOAuth: CreateSuperAdminDTO){
    return this.authService.createSuperAdmin(createUserDTOAuth);
  }

  @UseGuards(JwtGuard)
  @Put('updateSuperAdmin/:id')
  updateSuperAdmin(@Param('id') id: number, @Body() updateSuperAdminDTO: UpdateSuperAdminDTO){
    return this.authService.updateSuperAdmin(id, updateSuperAdminDTO);
  }

  @UseGuards(JwtGuard)
  @Get('allSuperAdmin')
  allSuperAdmin(){
    return this.authService.allSuperAdmin();
  }

  //@UseGuards(JwtGuard)
  @Delete('deleteUser/:id')
  deleteUser(@Param('id') id: number){
    return this.authService.deleteUser(id);
  }

  @UseGuards(JwtGuard)
  @Get('showProfile/:id')
  showProfile(@Param('id') id: number){
    return this.authService.showProfile(id);
  }

  //@UseGuards(JwtGuard)
  @Post('createOrganization')
  createOrganization(@Body() createOrganizationDTO: CreateOrganizationDTO){
    return this.authService.createOrganization(createOrganizationDTO);
  }

  @UseGuards(JwtGuard)
  @Put('updateOrganization/:id')
  updateOrganization(@Param('id') id: number, @Body() updateOrganizationDTO: UpdateOrganizationDTO){
    return this.authService.updateOrganization(id, updateOrganizationDTO);
  }

  @UseGuards(JwtGuard)
  @Delete('deleteOrganization/:id')
  deleteOrganization(@Param('id') id: number){
    return this.authService.deleteOrganization(id);
  }

  //@UseGuards(JwtGuard)
  @Post('createJobCategory')
  createJobCategory(@Body() createJobCategoryDTO: CreateJobCategoryDTO){
    return this.authService.createJobCategory(createJobCategoryDTO);
  }

  @Post('createEmployee')
  createEmployee(@Body() createEmployeeDTO: CreateEmployeeDTO){
    return this.authService.createEmployee(createEmployeeDTO);
  }

  @Post('createManager')
  createManager(@Body() createManagerDTO: CreateEmployeeDTO){
    return this.authService.createManager(createManagerDTO);
  }

  // @Post('login')
  // login(@Body() loginDTO: LoginDTO){
  //   //return this.authService.login(loginDTO);
  // }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) res){
    const value = await this.authService.login(loginDTO);
    const token = value.access_token;
    // console.log(token.access_token);
    //const value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjY3LCJ1c2VybmFtZSI6Ik1paGFkIiwiaWF0IjoxNjk5Nzk3NTgwLCJleHAiOjE2OTk4MDExODB9.dCfCYzdk_duhEWPJ3GDrdVBxN3ovEIyeJgfa2DoCS6Y";
    res.cookie('user_token', token , {
      expires: new Date(Date.now() + 3600000),
    });
    
    return value.role;
  }

  @UseGuards(JwtGuard)
  @Get('showOwnProfile')
  showOwnProfile(@Req() req){
    const user = req.user;
    //const data = this.authService.getUserFromId(user.id);
    return this.authService.getUserFromId(user.id);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('user_token', '', { expires: new Date(Date.now()) });
    const msg = "Logout Sucessful";
    return msg;
  }

  @UseGuards(JwtGuard)
  @Get('getCookie')
  getCookie(@Req() req): string {
    const value  = req.cookies;
    const user = req.user;
    console.log(user.id);
    console.log(value);
    return value;
  }

  @Post('login/organization')
  loginOrganization(@Body() loginDTO: LoginDTO){
    return this.authService.loginOrganization(loginDTO);
  }

  @Get('findOrg/:id')
  findOrg(@Param('id') id: number){
    return this.authService.findOrg(id);
  }

  @Get('allJobCategories/:id')
  allJobCategories(@Param('id') id: number){
    return this.authService.allJobCategories(id);
  }

  @Get('getAllManagers/:id')
  getAllManagers(@Param('id') id: number){
    return this.authService.getAllManagers(id);
  }

  @Get('getAllEmployees/:id')
  getAllEmployees(@Param('id') id: number){
    return this.authService.getAllEmployees(id);
  }

  @UseGuards(JwtGuard)
  @Get('getEmployeeDetails')
  getEmployeeDetails(@Req() req){
    const user = req.user;
    return this.authService.getEmployeeDetails(user.id);
  }

  
}
