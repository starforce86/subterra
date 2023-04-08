import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';

type CustomProps = {
  onLandOwnerClick: Function;
  onServiceProviderClick: Function;
};

export const RegistrationComponent: React.FC<CustomProps> = ({
  onLandOwnerClick,
  onServiceProviderClick,
}) => {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <span className={`${classes.textFont} ${classes.mainText}`}>
          Register as Land Owner
        </span>
        <span className={`${classes.textFont} ${classes.subText}`}>
          Track, manage heirship, receive guidance and more
        </span>
        <Button
          text="Get Started"
          iconLeading="user-01-white.svg"
          buttonStyle={classes.registerAsButton}
          onClick={() => onLandOwnerClick()}
        />
      </div>
      <div className={classes.innerContainer}>
        <span className={`${classes.textFont} ${classes.mainText}`}>
          Register as Service Provider
        </span>
        <span className={`${classes.textFont} ${classes.subText}`}>
          Get Connected
        </span>
        <Button
          text="Get Started"
          iconLeading="users-01-white.svg"
          buttonStyle={classes.registerAsButton}
          onClick={() => onServiceProviderClick()}
        />
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 51,
  },

  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 122,
  },

  textFont: {
    fontFamily: 'Inter',
    fontStretch: 'normal',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    color: '#000',
  },

  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#101828',
    marginBottom: 4,
  },

  subText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#475467',
    marginBottom: 15,
  },

  supportingText: {
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
  },

  registerAsButton: {
    width: 172,
    height: 40,
    fontSize: 16,
  },
});
