import { SimpleSubject } from '../simple-subject';

export const titleSubject = new SimpleSubject();

titleSubject.subscribe((nextTitle: string) => {
  document.title = nextTitle;
});
