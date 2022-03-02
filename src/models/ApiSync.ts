import axios, { AxiosPromise } from 'axios';

interface HasId {
	id?: number;
}

export class APiSync<T extends HasId> {
	constructor(public rootURL: string) {}

	fetch = (id: number): AxiosPromise => {
		return axios.get(`${this.rootURL}/${id}`);
	};

	save = (data: T): AxiosPromise => {
		const { id } = data;

		if (id) {
			// PUT
			return axios.put(`${this.rootURL}/${id}`, data);
		} else {
			// POST
			return axios.post(this.rootURL, data);
		}
	};
}
