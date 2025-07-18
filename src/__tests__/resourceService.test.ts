import { ResourceService } from '../../src/services/resourceService';
import { Resource, ResourceType } from '../../src/models/resource';
import { db } from '../../src/utils/database';

jest.mock('../../src/utils/database', () => ({
    db: {
        resources: new Map(),
    },
}));

describe('ResourceService', () => {
    let resourceService: ResourceService;

    beforeEach(() => {
        resourceService = new ResourceService();
        db.resources.clear();
    });

    test('should create a new resource', () => {
        const topicId = 'topic1';
        const url = 'https://example.com/resource1';
        const description = 'Resource description';
        const type = ResourceType.Video;

        const resource = resourceService.create(topicId, url, description, type);

        expect(resource).toBeDefined();
        expect(resource.topicId).toBe(topicId);
        expect(resource.url).toBe(url);
        expect(resource.description).toBe(description);
        expect(resource.type).toBe(type);
        expect(db.resources.size).toBe(1);
    });

    test('should retrieve all resources', () => {
        const resource1 = resourceService.create('topic1', 'https://example.com/resource1', 'Description1', ResourceType.Video);
        const resource2 = resourceService.create('topic2', 'https://example.com/resource2', 'Description2', ResourceType.Article);

        const resources = resourceService.getAll();

        expect(resources).toEqual([resource1, resource2]);
    });

    test('should retrieve a resource by ID', () => {
        const resource = resourceService.create('topic1', 'https://example.com/resource1', 'Description1', ResourceType.Video);

        const retrievedResource = resourceService.getById(resource.id);

        expect(retrievedResource).toEqual(resource);
    });

    test('should retrieve resources by topic ID', () => {
        const resource1 = resourceService.create('topic1', 'https://example.com/resource1', 'Description1', ResourceType.Video);
        const resource2 = resourceService.create('topic1', 'https://example.com/resource2', 'Description2', ResourceType.Article);
        const resource3 = resourceService.create('topic2', 'https://example.com/resource3', 'Description3', ResourceType.Video);

        const resources = resourceService.getByTopicId('topic1');

        expect(resources).toEqual([resource1, resource2]);
    });

    test('should update a resource', () => {
        const resource = resourceService.create('topic1', 'https://example.com/resource1', 'Description1', ResourceType.Video);

        const updatedResource = resourceService.update(resource.id, 'https://example.com/updated-resource', 'Updated description', ResourceType.Article);

        expect(updatedResource).toBeDefined();
        expect(updatedResource?.url).toBe('https://example.com/updated-resource');
        expect(updatedResource?.description).toBe('Updated description');
        expect(updatedResource?.type).toBe(ResourceType.Article);
    });

    test('should delete a resource by ID', () => {
        const resource = resourceService.create('topic1', 'https://example.com/resource1', 'Description1', ResourceType.Video);

        const result = resourceService.delete(resource.id);

        expect(result).toBe(true);
        expect(db.resources.size).toBe(0);
    });

    test('should return undefined when updating a non-existent resource', () => {
        const result = resourceService.update('non-existent-id', 'https://example.com/resource', 'Description', ResourceType.Video);

        expect(result).toBeUndefined();
    });
});