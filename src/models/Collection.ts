import axios, { AxiosResponse } from 'axios';
import { Events } from './Events';

export class Collection<E, P> {
	models: E[] = [];
	events: Events = new Events();

	constructor(public rootUrl: string, public deserialize: (json: P) => E) {}
	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch(): void {
		axios.get(this.rootUrl).then((respose: AxiosResponse) => {
			respose.data.forEach((element: P) => {
				this.models.push(this.deserialize(element));
			});

			this.trigger('change');
		});
	}
}
