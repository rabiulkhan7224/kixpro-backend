import { Role } from 'src/common/enums/roles.enum';

export type CurrentUser = {
  id: string;
  role: Role;
};
