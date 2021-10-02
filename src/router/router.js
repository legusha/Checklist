import PageBase from '~/views/base';
import PageNote from '~/views/note';

export const routes = [
  {path: '/', component: PageBase, exact: true},
  {path: '/note/:id', component: PageNote, exact: true},
]
