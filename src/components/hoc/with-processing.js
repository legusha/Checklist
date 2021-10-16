import React from 'react'

export default function WithProcessing ({ process, ProcessContent, Content }) {
  const isProcessRun = process.find(error => error)
  if (isProcessRun) {
    return <ProcessContent/>
  }
  return <Content/>
}
