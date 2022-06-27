import React from 'react';
import { AppConsumer } from '../app-context';
import PropTypes from 'prop-types'

const WithModelContext = (Wrapped, mapMethodsToProps) => {

  return (props) => {
    return (
      <AppConsumer>
        {
          (modelContext) => {
            const serviceProps = mapMethodsToProps(modelContext);

            return (
              <Wrapped {...props} {...serviceProps} />
            );
          }
        }
      </AppConsumer>
    );
  }
};

const { node, func } = PropTypes;

WithModelContext.propTypes = {
  Wrapped: node,
  mapMethodsToProps: func,
}

export default WithModelContext;
