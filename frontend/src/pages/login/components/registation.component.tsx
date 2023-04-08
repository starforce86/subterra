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
    <>
      <div>
        <p className={`${classes.textFont} ${classes.supportingText}`}>
          Don’t have account? Register as
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <Button
          type="secondary_gray"
          text="Land Owner"
          iconLeading="user-01.svg"
          buttonStyle={classes.registerAsButton}
          onClick={() => onLandOwnerClick()}
        />
        <Button
          type="secondary_gray"
          text="Service Provider"
          iconLeading="users-01.svg"
          buttonStyle={classes.registerAsButton}
          onClick={() => onServiceProviderClick()}
        />
      </div>
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

  supportingText: {
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
  },

  registerAsButton: {
    width: 181,
    height: 40,
    fontSize: 14,
  },
});
