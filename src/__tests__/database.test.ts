import { db } from '../../src/utils/database';

describe('InMemoryDatabase', () => {
    beforeEach(() => {
        db.topics.clear();
        db.resources.clear();
        db.users.clear();
    });

    test('should add and retrieve topics', () => {
        db.topics.set('1', { id: '1', name: 'Topic 1' });
        db.topics.set('2', { id: '2', name: 'Topic 2' });

        expect(db.topics.size).toBe(2);
        expect(db.topics.get('1')).toEqual({ id: '1', name: 'Topic 1' });
        expect(db.topics.get('2')).toEqual({ id: '2', name: 'Topic 2' });
    });

    test('should add and retrieve resources', () => {
        db.resources.set('1', { id: '1', url: 'http://example.com', type: 'video' });
        db.resources.set('2', { id: '2', url: 'http://example.org', type: 'article' });

        expect(db.resources.size).toBe(2);
        expect(db.resources.get('1')).toEqual({ id: '1', url: 'http://example.com', type: 'video' });
        expect(db.resources.get('2')).toEqual({ id: '2', url: 'http://example.org', type: 'article' });
    });

    test('should add and retrieve users', () => {
        db.users.set('1', { id: '1', name: 'User 1' });
        db.users.set('2', { id: '2', name: 'User 2' });

        expect(db.users.size).toBe(2);
        expect(db.users.get('1')).toEqual({ id: '1', name: 'User 1' });
        expect(db.users.get('2')).toEqual({ id: '2', name: 'User 2' });
    });

    test('should clear all collections', () => {
        db.topics.set('1', { id: '1', name: 'Topic 1' });
        db.resources.set('1', { id: '1', url: 'http://example.com', type: 'video' });
        db.users.set('1', { id: '1', name: 'User 1' });

        db.topics.clear();
        db.resources.clear();
        db.users.clear();

        expect(db.topics.size).toBe(0);
        expect(db.resources.size).toBe(0);
        expect(db.users.size).toBe(0);
    });
});