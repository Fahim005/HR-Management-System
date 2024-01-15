import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Authorization } from 'src/entities/authorization.entity';
import { Organization } from 'src/entities/organization.entity';
import { JobCategories } from 'src/entities/jobCategories.entity';
import { UserOrganizationTable } from 'src/entities/userOrganizationTable.entity';
import { UserJobTable } from 'src/entities/userJobTable.entity';

import { JwtSecretTMP, JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Authorization, Organization, JobCategories, UserOrganizationTable, UserJobTable]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: JwtSecretTMP,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
