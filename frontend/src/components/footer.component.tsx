import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import PinterestGray from '../assets/pinterest-icon-gray.svg';
import FacebookGray from '../assets/facebook-icon-gray.svg';
import TwitterGray from '../assets/twitter-icon-gray.svg';
import LinkedInGray from '../assets/linkedin-icon-gray.svg';

export const Footer: React.FC = (): ReactElement => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <span className={classes.text}>
        © 2022 Subterra Data Services. All rights reserved.
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <img src={PinterestGray} className={classes.icon} onClick={() => {}} />
        <img src={FacebookGray} className={classes.icon} onClick={() => {}} />
        <img src={TwitterGray} className={classes.icon} onClick={() => {}} />
        <img src={LinkedInGray} className={classes.icon} onClick={() => {}} />
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 35,
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#667085',
  },

  icon: {
    height: 24,
    width: 24,
    marginLeft: 35,
    cursor: 'pointer',
  },
});
