import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entity/user.entity";

<<<<<<< HEAD
export type AllowedRoles = keyof typeof UserRole | 'Any';
export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
=======
export type AllowedRoles=keyof typeof UserRole | 'Any';
 
export const Role=(roles:AllowedRoles[])=>SetMetadata('roles',roles);
//metadata를 설정함 metadata는 resolver의 extra data 
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
