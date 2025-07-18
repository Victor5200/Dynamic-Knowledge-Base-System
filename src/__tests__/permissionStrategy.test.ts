import { AdminStrategy, EditorStrategy, ViewerStrategy, PermissionContext } from '../../src/strategies/permissionStrategy';

describe('PermissionStrategy', () => {
    describe('AdminStrategy', () => {
        test('should allow all actions', () => {
            const strategy = new AdminStrategy();
            expect(strategy.canPerform('read')).toBe(true);
            expect(strategy.canPerform('create')).toBe(true);
            expect(strategy.canPerform('update')).toBe(true);
            expect(strategy.canPerform('delete')).toBe(true);
        });
    });

    describe('EditorStrategy', () => {
        test('should allow read, create, and update actions', () => {
            const strategy = new EditorStrategy();
            expect(strategy.canPerform('read')).toBe(true);
            expect(strategy.canPerform('create')).toBe(true);
            expect(strategy.canPerform('update')).toBe(true);
        });

        test('should not allow delete action', () => {
            const strategy = new EditorStrategy();
            expect(strategy.canPerform('delete')).toBe(false);
        });
    });

    describe('ViewerStrategy', () => {
        test('should allow only read action', () => {
            const strategy = new ViewerStrategy();
            expect(strategy.canPerform('read')).toBe(true);
        });

        test('should not allow create, update, or delete actions', () => {
            const strategy = new ViewerStrategy();
            expect(strategy.canPerform('create')).toBe(false);
            expect(strategy.canPerform('update')).toBe(false);
            expect(strategy.canPerform('delete')).toBe(false);
        });
    });

    describe('PermissionContext', () => {
        test('should delegate to AdminStrategy', () => {
            const context = new PermissionContext(new AdminStrategy());
            expect(context.can('read')).toBe(true);
            expect(context.can('create')).toBe(true);
            expect(context.can('update')).toBe(true);
            expect(context.can('delete')).toBe(true);
        });

        test('should delegate to EditorStrategy', () => {
            const context = new PermissionContext(new EditorStrategy());
            expect(context.can('read')).toBe(true);
            expect(context.can('create')).toBe(true);
            expect(context.can('update')).toBe(true);
            expect(context.can('delete')).toBe(false);
        });

        test('should delegate to ViewerStrategy', () => {
            const context = new PermissionContext(new ViewerStrategy());
            expect(context.can('read')).toBe(true);
            expect(context.can('create')).toBe(false);
            expect(context.can('update')).toBe(false);
            expect(context.can('delete')).toBe(false);
        });
    });
});