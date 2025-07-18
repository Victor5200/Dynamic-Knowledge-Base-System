import { BaseEntity } from './baseEntity';

export enum UserRole {
    Admin = 'Admin',
    Editor = 'Editor',
    Viewer = 'Viewer',
}

export class User extends BaseEntity {
    name: string;
    email: string;
    role: UserRole;

    constructor(id: string, name: string, email: string, role: UserRole) {
        super(id);
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
