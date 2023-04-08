import React from 'react';
import { createUseStyles } from 'react-jss';

export const LoginHeaderComponent: React.FC = () => {
  const classes = styles();
  return (
    <>
      <img
        src={require('../../../assets/positive.png')}
        className={classes.logo}
      />
      <span className={`${classes.textFont} ${classes.textHeader}`}>
        Welcome to Subterra!
      </span>
      <span className={`${classes.textFont} ${classes.supportingTextHeader}`}>
        To get started, please enter your details.
      </span>
    </>
  );
};

const styles = createUseStyles({
  textFont: {
    fontFamily: 'Inter',
    fontStretch: 'normal',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    color: '#000',
  },

  logo: {
    width: 204,
    height: 68,
    objectFit: 'contain',
    marginBottom: 9,
  },

  textHeader: {
    fontSize: 30,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 6,
  },

  supportingTextHeader: {
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#667085',
  },
});
