import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { Sync } from './Sync';
export interface UserProps {
	id?: number;
	name: string;
	age: number;
}

const rootURL = 'http://localhost:3000/users';

export class User {
	public attributes: Attributes<UserProps>;
	public events: Events = new Events();
	public sync: Sync<UserProps> = new Sync<UserProps>(rootURL);

	constructor(attrs: UserProps) {
		this.attributes = new Attributes(attrs);
	}

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

	set(update: Partial<UserProps>): void {
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
