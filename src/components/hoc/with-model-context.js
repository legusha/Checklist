import React from 'react';
import { AppConsumer } from '../app-context';

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

export default WithModelContext;
