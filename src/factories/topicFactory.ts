import { TopicVersion } from '../models/Topic';

export class TopicVersionFactory {
    static createVersion(content: string, version: number): TopicVersion {
        return {
            content,
            version,
            createdAt: new Date()
        };
    }
}
