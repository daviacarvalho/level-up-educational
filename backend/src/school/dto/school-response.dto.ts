import { Role } from '../../../generated/prisma';

export class PrincipalDto {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export class SchoolResponseDto {
  id: string;
  name: string;
  city: string;
  principalName: string;
  principal?: PrincipalDto;
}
