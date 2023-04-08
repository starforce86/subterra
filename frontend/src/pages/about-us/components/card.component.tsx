import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import TwitterIcon from '../../../assets/twitter-icon-gray.svg';
import LinkedinIcon from '../../../assets/linkedin-icon-gray.svg';
import DribbleIcon from '../../../assets/dribble-icon.svg';

type CustomProps = {
  name: string;
  image: string;
  position: string;
  description: string;
  twitterLink: string;
  linkedinLink: string;
  dribbleLink: string;
};

export const CardComponent: React.FC<CustomProps> = ({
  name,
  image,
  position,
  description,
  twitterLink,
  linkedinLink,
  dribbleLink,
}) => {
  const classes = styles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 247 }}>
      <img src={image} className={classes.image} />
      <div style={{ marginTop: 20 }}>
        <span className={`${classes.text} ${classes.name}`}>{name}</span>
      </div>
      <div>
        <span className={`${classes.text} ${classes.position}`}>
          {position}
        </span>
      </div>
      <div style={{ marginTop: 8 }}>
        <span className={`${classes.text} ${classes.description}`}>
          {description}
        </span>
      </div>
      <div style={{ marginTop: 16 }}>
        <Link to={twitterLink} target="_blank">
          <img src={TwitterIcon} className={classes.icon} />
        </Link>
        <Link to={linkedinLink} target="_blank">
          <img src={LinkedinIcon} className={classes.icon} />
        </Link>
        <Link to={dribbleLink} target="_blank">
          <img src={DribbleIcon} className={classes.icon} />
        </Link>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontStretch: 'normal',
    textAlign: 'left',
  },

  name: {
    fontSize: 18,
    fontWeight: 600,
    color: '#101828',
  },

  position: {
    fontSize: 16,
    color: '#336b8e',
  },

  description: {
    fontSize: 16,
    color: '#475467',
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 16,
  },
});
