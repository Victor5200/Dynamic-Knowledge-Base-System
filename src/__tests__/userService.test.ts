import { UserService } from '../../src/services/userService';
import { User, UserRole } from '../../src/models/user';
import { db } from '../../src/utils/database';

jest.mock('../../src/utils/database', () => ({
    db: {
        users: new Map(),
    },
}));

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
        db.users.clear();
    });

    test('should create a new user', () => {
        const name = 'John Doe';
        const email = 'john.doe@example.com';
        const role = UserRole.Admin;

        const user = userService.create(name, email, role);

        expect(user).toBeDefined();
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(user.role).toBe(role);
        expect(db.users.size).toBe(1);
    });

    test('should retrieve all users', () => {
        const user1 = userService.create('User1', 'user1@example.com', UserRole.Editor);
        const user2 = userService.create('User2', 'user2@example.com', UserRole.Viewer);

        const users = userService.getAll();

        expect(users).toEqual([user1, user2]);
    });

    test('should retrieve a user by ID', () => {
        const user = userService.create('User1', 'user1@example.com', UserRole.Editor);

        const retrievedUser = userService.getById(user.id);

        expect(retrievedUser).toEqual(user);
    });

    test('should delete a user by ID', () => {
        const user = userService.create('User1', 'user1@example.com', UserRole.Editor);

        const result = userService.delete(user.id);

        expect(result).toBe(true);
        expect(db.users.size).toBe(0);
    });

    test('should return undefined when updating a non-existent user', () => {
        const result = userService.update('non-existent-id', 'new content');

        expect(result).toBeUndefined();
    });
});