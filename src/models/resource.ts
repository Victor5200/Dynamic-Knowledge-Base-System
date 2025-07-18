import { BaseEntity } from './BaseEntity';

export type ResourceType = 'video' | 'article' | 'pdf';

export class Resource extends BaseEntity {
    topicId: string;
    url: string;
    description: string;
    type: ResourceType;

    constructor(id: string, topicId: string, url: string, description: string, type: ResourceType) {
        super(id);
        this.topicId = topicId;
        this.url = url;
        this.description = description;
        this.type = type;
    }
}
