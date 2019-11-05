import { User } from './user';
import { Owner } from './owner';
import { GroupHabilitation } from './group-habilitation';

export class UserGroup {
    id: number;
    code: string;
    description: string;
    owner: Owner;
    users: User[];
    type: number;
    groupHabilitations: GroupHabilitation[];


}
