import { TopicVersion } from '../models/topic';

export class TopicVersionFactory {
    static createVersion(content: string, version: number): TopicVersion {
        return {
            content,
            version,
            createdAt: new Date()
        };
    }
}
