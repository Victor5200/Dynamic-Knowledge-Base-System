import { BaseEntity } from '../../src/models/baseEntity';

class TestEntity extends BaseEntity {}

describe('BaseEntity Model', () => {
    test('should initialize with correct properties', () => {
        const entity = new TestEntity('1');

        expect(entity.id).toBe('1');
        expect(entity.createdAt).toBeInstanceOf(Date);
        expect(entity.updatedAt).toBeInstanceOf(Date);
        expect(entity.createdAt.getTime()).toBeCloseTo(entity.updatedAt.getTime(), -2);
    });

    test('should update the updatedAt timestamp', () => {
        const entity = new TestEntity('1');
        const originalUpdatedAt = entity.updatedAt;

        entity.updateTimestamp();

        expect(entity.updatedAt).toBeInstanceOf(Date);
    });
});