import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export const Loading = (props) => {
  const { isLoading } = props;
  return (
    <Spinner
      visible={isLoading}
      textStyle={{
        color: '#FFF',
      }}
      {...props}
    />
  );
};
