import { Model, HasId } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {
	constructor(public parent: Element, public model: T) {
		this.bindModel();
	}

	abstract template(): string;

	regions: { [key: string]: Element } = {}; // optional abstract methods to override
	regionsMap(): { [key: string]: string } {
		return {};
	}

	eventsMap(): { [key: string]: () => void } {
		return {};
	}

	mapRegions = (fragment: DocumentFragment): void => {
		const regionsMap = this.regionsMap();

		for (let key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector);
			if (element) this.regions[key] = element;
		}
	};

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

	onRender(): void {}

	render() {
		this.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.mapRegions(templateElement.content);
		this.onRender();
		this.parent && this.parent.append(templateElement.content);
	}
}
