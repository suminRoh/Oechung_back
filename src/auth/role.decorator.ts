import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entity/user.entity";

export type AllowedRoles=keyof typeof UserRole | 'Any';
 
export const Role=(roles:AllowedRoles[])=>SetMetadata('roles',roles);
//metadata를 설정함 metadata는 resolver의 extra data 