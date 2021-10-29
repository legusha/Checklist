import React from 'react';
import { Switch } from 'react-router-dom';

import { RouterProvider } from '~/router'

import { AppProvider } from '~/components/app-context';
import ModalActions from '~/components/modal';
// import ErrorView from '~/views/error'

import { useModal } from '~/hooks/context';

// const Page404 = () => <h1>Four: 404 </h1>

export default function App () {
  const { modal, initModal } = useModal()
  const apiModal = initModal();

  const app = {
    modal: {
      ...modal,
      ...apiModal
    }
  }

  const Content = () => (
    <section>
      <Switch>
        <AppProvider value={{ app }}>
          <RouterProvider/>
        </AppProvider>
      </Switch>
      <ModalActions modal={app.modal} />
    </section>
  )

  return (
    <main className="App, mt-4">
      <Content/>
    </main>
  )
}
