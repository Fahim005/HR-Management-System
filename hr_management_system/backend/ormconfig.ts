import { Authorization } from "src/entities/authorization.entity";
import { DocumentTrack } from "src/entities/documentTrack.entity";
import { JobApplication } from "src/entities/jobApplication.entity";
import { JobCategories } from "src/entities/jobCategories.entity";
import { JobRequirments } from "src/entities/jobRequirments.entity";
import { NoticeDescription } from "src/entities/noticeDescription.entity";
import { NoticeTrack } from "src/entities/noticeTrack.entity";
import { Organization } from "src/entities/organization.entity";
import { SecureDocument } from "src/entities/secureDocument.entity";
import { User } from "src/entities/user.entity";
import { UserJobTable } from "src/entities/userJobTable.entity";
import { UserOrganizationTable } from "src/entities/userOrganizationTable.entity";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "hr_management_system",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: '3473',
    entities: [Authorization, DocumentTrack, JobApplication, JobCategories, JobRequirments, NoticeDescription, NoticeTrack, Organization, SecureDocument, User, UserJobTable, UserOrganizationTable],
    synchronize: true
}

export default config;