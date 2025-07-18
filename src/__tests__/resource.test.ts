import {Resource, ResourceType} from '../../src/models/resource';

describe('Resource Model', () => {
    test('should initialize with correct properties', () => {
        const resource = new Resource('1', '2', 'dummy', 'Resource Description', ResourceType.PDF);

        expect(resource.id).toBe('1');
        expect(resource.topicId).toBe('2');
        expect(resource.description).toBe('Resource Description');
        expect(resource.type).toBe(ResourceType.PDF);
    });

    test('should allow updating the timestamp', () => {
        const resource = new Resource('1', '2', 'dummy', 'Resource Description', ResourceType.PDF);
        resource.updateTimestamp();

        expect(resource.updatedAt).toBeDefined();
        expect(resource.type).toBe(ResourceType.PDF);
    });
});