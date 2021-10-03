import PageBase from '~/views/base';
import PageNote from '~/views/note';
import React from 'react'

const Page404 = () => <h1>Page 404</h1>
export const routes = [
  {path: '/', component: PageBase, exact: true},
  {path: '/note/:id', component: PageNote, exact: true},
  {path: '/404', component: Page404, exact: true},
]
