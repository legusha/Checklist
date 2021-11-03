import React from 'react'


export default function WithProcessing ({ process, ProcessContent, Content }) {
  const isProcessRun = process.find(pr => pr)
  if (isProcessRun) {
    return <ProcessContent/>
  }
  return <Content/>
}
