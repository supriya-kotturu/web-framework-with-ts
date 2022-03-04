import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-random-age': this.onSetAgeHandleClick,
			'click:.set-user-name': this.onSetNameHandleClick,
			'click:.set-save': this.onSetSaveHandleClick,
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

	onSetSaveHandleClick = (): void => {
		this.model.save();
	};

	template(): string {
		return `<div>
        <input placeholder="${this.model.get(
					'name'
				)}" type="text"id="temp-name" name="temp-name"/>
        <button class="set-user-name"> Set User Name</button> <br/><br/>
        <button class="set-random-age">Set Random Age</button> <br/><br/>
        <button class="set-save">Save</button>
        </div>`;
	}
}
