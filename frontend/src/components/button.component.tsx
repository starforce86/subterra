import React from 'react';
import { createUseStyles } from 'react-jss';

type ButtonType =
  | 'primary'
  | 'secondary_color'
  | 'secondary_gray'
  | 'link_gray'
  | 'link_color';

type CustomProps = {
  type?: ButtonType;
  iconLeading?: string;
  iconTrailing?: string;
  text: string;
  buttonStyle?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick: Function;
};

export const Button: React.FC<CustomProps> = ({
  type = 'primary',
  iconLeading,
  iconTrailing,
  text,
  buttonStyle = '',
  destructive = false,
  disabled = false,
  onClick,
}: CustomProps) => {
  const classes = styles();

  return (
    <button
      className={`${buttonStyle} ${classes[type]} ${classes.default} `}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {iconLeading && (
        <img
          src={require(`../assets/${iconLeading}`)}
          className={classes.icon}
        />
      )}
      <span className={destructive ? classes.destructive : ''}>{text}</span>
      {iconTrailing && (
        <img
          src={require(`../assets/${iconTrailing}`)}
          className={classes.icon}
        />
      )}
    </button>
  );
};

const styles = createUseStyles({
  icon: {
    height: 20,
    width: 20,
    marginLeft: 5,
    marginRight: 5,
  },

  default: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: 0,

    '-webkitUserSelect': 'none',
    '-msUserSelect': 'none',
    userSelect: 'none',
  },

  destructive: {
    color: '#c04b41',
  },

  primary: {
    color: '#ffffff',
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    border: ['solid', 1, '#4c7d9c'],

    backgroundColor: '#4c7d9c',
    '&:hover': {
      backgroundColor: '#336b8e',
    },
    '&:active': {
      backgroundColor: '#4c7d9c',
    },
    '&:disabled': {
      backgroundColor: '#afc4d2',
      border: ['solid', 1, '#afc4d2'],
    },
  },

  secondary_color: {
    border: ['solid', 1, '#e0e7ed'],
    color: '#344054',

    backgroundColor: '#e0e7ed',
    '&:hover': {
      backgroundColor: '#c8d6df',
    },
    '&:active': {
      backgroundColor: '#e0e7ed',
    },
    '&:disabled': {
      backgroundColor: '#f9f9fa',
      color: '#d0d5dd',
    },
  },

  secondary_gray: {
    border: ['solid', 1, '#d0d5dd'],
    color: '#344054',

    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#f9fafb',
    },
    '&:active': {
      backgroundColor: '#ffffff',
    },
    '&:disabled': {
      backgroundColor: '#ffffff',
      color: '#d0d5dd',
    },
  },

  link_gray: {
    backgroundColor: 'transparent',
    color: '#475467',
    border: 'none',

    '&:disabled': {
      backgroundColor: 'transparent',
      color: '#d0d5dd',
    },
  },

  link_color: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#336b8e',

    '&:disabled': {
      backgroundColor: 'transparent',
      color: '#d0d5dd',
    },
  },
});
