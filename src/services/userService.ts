import { User, UserRole } from '../models/user';
import { db } from '../utils/database';
import { v4 as uuidv4 } from 'uuid';
import {Topic} from "../models/topic";

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

    update(id: string, newContent: string): Topic | undefined {
        const user = db.users.get(id);
        if (!user) return undefined;

        db.topics.set(id, user);
        return user;
    }
}
