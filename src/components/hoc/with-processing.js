import React from 'react'
import PropTypes from "prop-types";

const { array, func } = PropTypes;

WithProcessing.propTypes = {
  process: array,
  ProcessContent: func,
  Content: func,
}

export default function WithProcessing ({ process, ProcessContent, Content }) {
  const isProcessRun = process.includes(true)
  if (isProcessRun) {
    return <ProcessContent/>
  }
  return <Content/>
}
