import axios, { AxiosResponse } from 'axios';

interface UserProps {
	id?: number;
	name: string;
	age: number;
}

type Callback = () => void;

export class User {
	private _events: { [key: string]: Callback[] } = {};
	constructor(private data: UserProps) {}

	get<K extends keyof UserProps>(propName: K): string | number | undefined {
		return this.data[propName];
	}

	set(update: Partial<UserProps>): void {
		Object.assign(this.data, update);
	}

	on(eventName: string, callback: Callback): void {
		const handlers = this._events[eventName] || [];
		handlers.push(callback);
		this._events[eventName] = handlers;
	}

	trigger(eventName: string): void {
		const handlers = this._events[eventName];
		if (!handlers || handlers.length === 0) return;
		handlers.forEach((callback) => callback());
	}

	fetch(): void {
		const usersURL = 'http://localhost:3000/users/';
		axios
			.get(usersURL + this.get('id'))
			.then((response: AxiosResponse): void => {
				this.set(response.data);
			});
	}

	save(): void {
		const usersURL = 'http://localhost:3000/users/';
		const id = this.get('id');

		if (id) {
			// PUT
			axios.put(usersURL + id, this.data);
		} else {
			// POST
			axios.post(usersURL, this.data);
		}
	}
}
