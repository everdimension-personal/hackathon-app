import React from 'react';
import { useMedia } from 'the-platform';
import s from './ListItem.module.css';

interface Props extends React.HTMLProps<HTMLDivElement> {}
export const ListItem: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  const large = useMedia('(min-width: 600px)');
  return (
    <div
      {...props}
      className={large ? s.hover : undefined}
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid var(--light-gray2)',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </div>
  );
};
