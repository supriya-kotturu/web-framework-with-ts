import './style.css';

import { User } from './models/User';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
console.log('smoke test - connectivity');

const user = new User({ name: 'yalk', age: 45 });

user.on('change', () => console.log('User was changed! : ', user));
user.on('save', () => console.log('User saved in DB! : ', user));
user.on('error', () => console.log('Error occured while saving to DB =('));

user.set({ name: 'james' });
console.log(user.get('name'));

user.on('click', () => console.log(user));
user.on('hover', () => console.log('hover'));
user.on('click', () => console.log('yeet!'));
user.on('click', () => console.log('mouseclick'));
user.on('yelp', () => {});

user.trigger('click');
user.trigger('yelp');

user.save();
user.fetch();
