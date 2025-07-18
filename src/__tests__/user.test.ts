import { User, UserRole } from '../../src/models/user';

describe('User Model', () => {
    test('should initialize with correct properties', () => {
        const user = new User('1', 'John Doe', 'john.doe@example.com', UserRole.Admin);

        expect(user.id).toBe('1');
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.role).toBe(UserRole.Admin);
    });

    test('should allow different roles', () => {
        const admin = new User('2', 'Admin User', 'admin@example.com', UserRole.Admin);
        const editor = new User('3', 'Editor User', 'editor@example.com', UserRole.Editor);
        const viewer = new User('4', 'Viewer User', 'viewer@example.com', UserRole.Viewer);

        expect(admin.role).toBe(UserRole.Admin);
        expect(editor.role).toBe(UserRole.Editor);
        expect(viewer.role).toBe(UserRole.Viewer);
    });
});