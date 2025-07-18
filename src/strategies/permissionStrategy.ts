type Action = 'read' | 'create' | 'update' | 'delete';

export interface PermissionStrategy {
    canPerform(action: Action): boolean;
}

export class AdminStrategy implements PermissionStrategy {
    canPerform(action: Action): boolean { return true; }
}

export class EditorStrategy implements PermissionStrategy {
    canPerform(action: Action): boolean {
        return ['read', 'create', 'update'].includes(action);
    }
}

export class ViewerStrategy implements PermissionStrategy {
    canPerform(action: Action): boolean {
        return action === 'read';
    }
}

export class PermissionContext {
    constructor(private readonly strategy: PermissionStrategy) {}

    can(action: Action): boolean {
        return this.strategy.canPerform(action);
    }
}
