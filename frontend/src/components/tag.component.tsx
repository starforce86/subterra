import React from 'react';
import { createUseStyles } from 'react-jss';
import XBUTTON from '../assets/x-close.svg';

type CustomProps = {
  text: string;
  tagStyle?: string;
  onClick: Function;
};

export const Tag: React.FC<CustomProps> = ({
  text,
  tagStyle = '',
  onClick,
}: CustomProps) => {
  const classes = styles();

  return (
    <div
      className={`${tagStyle} ${classes.default} `}
      onClick={() => onClick()}
    >
      <span>{text}</span>
      <img src={XBUTTON} className={classes.closeIcon} />
    </div>
  );
};

const styles = createUseStyles({
  default: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: '3px 5px',
    border: ['solid', 1, '#eaecf0'],

    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 500,
    fontStyle: 'normal',
    letterSpacing: 0,

    '-webkitUserSelect': 'none',
    '-msUserSelect': 'none',
    userSelect: 'none',
  },

  closeIcon: {
    height: 10,
    width: 10,
    marginLeft: 3,
  },
});
