import { App } from './app';

const app = new App();

app.start(() => console.log(`Server is up and running`));
