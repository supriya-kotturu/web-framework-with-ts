import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
	set(value: Partial<T>): void;
	getAll(): T;
	get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}

interface Events {
	on(eventName: string, callback: () => void): void;
	trigger(eventName: string): void;
}

export interface HasId {
	id: number;
}

export class Model<T extends HasId> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private sync: Sync<T>
	) {}

	// returns 'on' function from the Events class
	get on() {
		return this.events.on;
	}

	get get() {
		return this.attributes.get;
	}

	get trigger() {
		return this.events.trigger;
	}

	set(update: Partial<T>): void {
		this.attributes.set(update);
		this.events.trigger('change'); // trigger this function call stack, after the user updates
	}

	fetch(): void {
		const id = this.attributes.get('id');

		if (typeof id !== 'number') {
			throw new Error('Cannot fetch without an ID');
		}

		this.sync.fetch(id).then((response: AxiosResponse) => {
			this.set(response.data);
		});
	}

	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((response: AxiosResponse): void => {
				this.trigger('save');
			})
			.catch(() => {
				this.trigger('error');
			});
	}
}
