import { User, UserRole } from '../models/User';
import { db } from '../utils/database';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    create(name: string, email: string, role: UserRole): User {
        const id = uuidv4();
        const user = new User(id, name, email, role);
        db.users.set(id, user);
        return user;
    }

    getAll(): User[] {
        return Array.from(db.users.values());
    }

    getById(id: string): User | undefined {
        return db.users.get(id);
    }

    delete(id: string): boolean {
        return db.users.delete(id);
    }
}
