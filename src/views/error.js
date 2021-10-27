import React from 'react'
import {Topbar} from "~/components/layout";

export default function ErrorView () {
  return (
    <section className="container-lg container-fluid main">
      <Topbar />
      <div className='d-flex align-center justify-center'>
        <p>Извините, что-то пошло не так,пожалуйста проверьте своё интернет соединение,или <strong>URL</strong> веб сервера</p>
      </div>
    </section>
  )
}
