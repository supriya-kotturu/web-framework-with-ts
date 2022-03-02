import { User } from '../models/User';

export class UserForm {
	constructor(public parent: Element, public model: User) {
		this.bindModel();
	}

	bindModel(): void {
		this.model.on('change', () => this.render());
	}

	bindEvents(fragment: DocumentFragment) {
		const eventsMap = this.eventsMap();

		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');
			fragment
				.querySelectorAll(selector)
				.forEach((ele) => ele.addEventListener(eventName, eventsMap[eventKey]));
		}
	}

	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-random-age': this.onSetAgeHandleClick,
			'click:.set-user-name': this.onSetNameHandleClick,
		};
	}

	onSetAgeHandleClick = (): void => {
		this.model.setRandomAge();
	};

	onSetNameHandleClick = (): void => {
		const tempInput: HTMLInputElement | null =
			document.querySelector('#temp-name');
		if (tempInput) {
			this.model.set({ name: tempInput.value });
		}
	};

	template(): string {
		return `<div>
        <h2>Name : ${this.model.get('name')}</h2>
        <h4>Age : ${this.model.get('age')}</h4>
        <input type="text"id="temp-name" name="temp-name"/>
        <button class="set-user-name"> Set User Name</button> <br/><br/>
        <button class="set-random-age" >Set Random Age</button>
        </div>`;
	}

	render() {
		this.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.parent && this.parent.append(templateElement.content);
	}
}
