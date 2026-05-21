import { browser } from '$app/environment';

export interface Todo {
	id: string;
	text: string;
	createdAt: string; // ISO 8601
}

const STORAGE_KEY = 'todos';

function load(): Todo[] {
	if (!browser) return [];
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
	} catch {
		return [];
	}
}

function persist(items: Todo[]) {
	if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

let items = $state<Todo[]>(load());

export const todos = {
	get items() {
		return items;
	},

	add(text: string) {
		items = [...items, { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() }];
		persist(items);
	},

	edit(id: string, text: string) {
		items = items.map((t) => (t.id === id ? { ...t, text } : t));
		persist(items);
	},

	remove(id: string) {
		items = items.filter((t) => t.id !== id);
		persist(items);
	}
};
