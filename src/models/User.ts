import { Events } from './Events';
import { Sync } from './Sync';
export interface UserProps {
	id?: number;
	name: string;
	age: number;
}

const rootURL = 'http://localhost:3000/users';

export class User {
	constructor(private data: UserProps) {}
	public events: Events = new Events();
	public sync: Sync<UserProps> = new Sync<UserProps>(rootURL);

	get<K extends keyof UserProps>(propName: K): string | number | undefined {
		return this.data[propName];
	}

	set(update: Partial<UserProps>): void {
		Object.assign(this.data, update);
	}
}
