import { BaseEntity } from './BaseEntity';
import { TopicVersionFactory } from '../factories/topicFactory';

export interface TopicVersion {
    content: string;
    version: number;
    createdAt: Date;
}

export class Topic extends BaseEntity {
    name: string;
    parentTopicId?: string;
    versions: TopicVersion[];

    constructor(id: string, name: string, content: string, parentTopicId?: string) {
        super(id);
        this.name = name;
        this.parentTopicId = parentTopicId;
        this.versions = [{
            content,
            version: 1,
            createdAt: new Date()
        }];
    }

    addVersion(content: string) {
        const newVersion = TopicVersionFactory.createVersion(content, this.versions.length + 1);
        this.versions.push(newVersion);
        this.updateTimestamp();
    }

    getLatestContent(): string {
        return this.versions[this.versions.length - 1].content;
    }
}
