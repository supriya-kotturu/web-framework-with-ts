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
}
