import { Model } from './Model';
import { Attributes } from './Attributes';
import { APiSync } from './ApiSync';
import { Events } from './Events';
import { Collection } from './Collection';

export interface UserProps {
	id: number;
	name: string;
	age: number;
}

const rootURL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
	static buildUser(attrs: UserProps): User {
		return new User(
			new Attributes<UserProps>(attrs),
			new Events(),
			new APiSync<UserProps>(rootURL)
		);
	}

	static buildUserCollection(): Collection<User, UserProps> {
		return new Collection<User, UserProps>(rootURL, (json: UserProps) =>
			User.buildUser(json)
		);
	}

	isAdminUser(): boolean {
		return this.get('id') === 1;
	}

	setRandomAge(): void {
		const age = Math.round(Math.random() * 100);
		console.log(age, 'here');
		this.set({ age });
	}
}
