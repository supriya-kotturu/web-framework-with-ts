import axios, { AxiosResponse } from 'axios';

interface UserProps {
	id?: number;
	name: string;
	age: number;
}

export class User {
	constructor(private data: UserProps) {}

	get<K extends keyof UserProps>(propName: K): string | number | undefined {
		return this.data[propName];
	}

	set(update: Partial<UserProps>): void {
		Object.assign(this.data, update);
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
