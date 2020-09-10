import React from 'react';
import { ModelConsumer } from '../model-context';

const WithModelContext = (Wrapped, mapMethodsToProps) => {

  return (props) => {
    return (
      <ModelConsumer>
        {
          (modelContext) => {
            const serviceProps = mapMethodsToProps(modelContext);

            return (
              <Wrapped {...props} {...serviceProps} />
            );
          }
        }
      </ModelConsumer>
    );
  }
};

export default WithModelContext;
