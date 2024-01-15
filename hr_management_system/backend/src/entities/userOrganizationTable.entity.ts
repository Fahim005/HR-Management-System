import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Organization } from "./organization.entity";

@Entity('UserOrganizationTable')
export class UserOrganizationTable{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({nullable:false})
    // UserID: number;

    // @Column({nullable:false})
    // OrgID: number;

    @ManyToOne(()=> User, user => user.userOrganizationTable, { cascade: true, onDelete: 'CASCADE' })
    //@JoinColumn({ name: "UserID" })
    @JoinColumn()
    user: User;

    @ManyToOne(()=> Organization, organization => organization.userOrganizationTable, { cascade: true, onDelete: 'CASCADE' })
    //@JoinColumn({ name: "OrgID" })
    @JoinColumn()
    organization: Organization;

}