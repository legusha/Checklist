import React from 'react';
import { Switch } from 'react-router-dom';
import { RouterProvider } from 'router'
import { AppProvider } from 'components/app-context';

export default function App () {
  const app = {}

  return (
    <main className="App, mt-4">
      <section>
        <Switch>
          <AppProvider value={{ app }}>
            <RouterProvider/>
          </AppProvider>
        </Switch>
      </section>
    </main>
  )
}
