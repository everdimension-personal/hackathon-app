import React from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const Page: React.FunctionComponent<Props> = (props) => {
  return <div style={{ maxWidth: 600, margin: '0 auto' }} {...props}></div>;
};
