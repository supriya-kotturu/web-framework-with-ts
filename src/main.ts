import './style.css';

import { User } from './models/User';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
console.log('smoke test - connectivity');

const user = new User({ name: 'yalk', age: 45 });

// GET
console.log(user.get('name'));
// SET
user.set({ name: 'james' });

// ON
user.on('click', () => {
	console.log(user);
});
user.on('hover', () => {
	console.log('hover rr');
});
user.on('click', () => console.log('yeet!'));
user.on('click', () => console.log('huserclick'));
user.on('yelp', () => {});

// TRIGGER
user.trigger('click');
user.trigger('yelp');

// SAVE
user.save();

// FETCH
user.fetch();
