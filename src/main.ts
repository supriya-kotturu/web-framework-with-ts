import './style.css';

import { User } from './models/User';
import { UserEdit } from './Views/UserEdit';
import { UserList } from './Views/UserList';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
console.log('smoke test - connectivity');

const user = User.buildUser({ id: 1, name: 'yalk', age: 45 });

user.on('change', () => console.log('User was changed! : ', user));
user.on('save', () => console.log('User saved in DB! : ', user));
user.on('error', () => console.log('Error occured while saving to DB =('));

user.set({ name: 'james' });
console.log(user.get('name'));

user.on('hover', () => console.log('hover'));
user.on('click', () => console.log('yeet!'));
user.on('click', () => console.log('mouseclick'));
user.on('yelp', () => {});

user.trigger('yelp');

user.save();
user.fetch();

// COLLECTION
const collection = User.buildUserCollection();

collection.on('change', () => {
	// COLLECTION VIEW
	const root = document.getElementById('root');
	if (root) {
		new UserList(root, collection).render();
	}
	console.log(collection, 'here');
});

collection.fetch();

// USER Edit
const root = document.getElementById('app');
if (root) {
	const userEdit = new UserEdit(root, user);
	userEdit.render();
	console.log(userEdit);
}
