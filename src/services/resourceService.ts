import { Resource, ResourceType } from '../models/Resource';
import { db } from '../utils/database';
import { v4 as uuidv4 } from 'uuid';

export class ResourceService {
    create(topicId: string, url: string, description: string, type: ResourceType): Resource {
        const id = uuidv4();
        const resource = new Resource(id, topicId, url, description, type);
        db.resources.set(id, resource);
        return resource;
    }

    getAll(): Resource[] {
        return Array.from(db.resources.values());
    }

    getById(id: string): Resource | undefined {
        return db.resources.get(id);
    }

    getByTopicId(topicId: string): Resource[] {
        return this.getAll().filter(r => r.topicId === topicId);
    }

    update(id: string, url: string, description: string, type: ResourceType): Resource | undefined {
        const resource = db.resources.get(id);
        if (!resource) return undefined;

        resource.url = url;
        resource.description = description;
        resource.type = type;
        resource.updateTimestamp();
        db.resources.set(id, resource);
        return resource;
    }

    delete(id: string): boolean {
        return db.resources.delete(id);
    }
}
