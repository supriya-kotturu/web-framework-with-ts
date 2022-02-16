import './style.css';

import { User } from './models/User';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
console.log('smoke test - connectivity');

const user = new User({ name: 'yalk', age: 45 });
console.log(user.attributes.get('name'));
user.attributes.set({ name: 'james' });
user.events.on('click', () => {
	console.log(user);
});

user.events.on('hover', () => {
	console.log('hover rr');
});
user.events.on('click', () => console.log('yeet!'));
user.events.on('click', () => console.log('huserclick'));
user.events.on('yelp', () => {});

user.events.trigger('click');
user.events.trigger('yelp');
user.sync.save({ name: 'welma', age: 78 });
user.sync.fetch(2);
