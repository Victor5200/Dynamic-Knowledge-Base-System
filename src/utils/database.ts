type Collection<T> = Map<string, T>;

class InMemoryDatabase {
    topics: Collection<any> = new Map();
    resources: Collection<any> = new Map();
    users: Collection<any> = new Map();
}

export const db = new InMemoryDatabase();
