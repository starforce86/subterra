import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';

type CustomProps = {
  onSocialLogin: Function;
};

export const SocialLoginComponent: React.FC<CustomProps> = ({
  onSocialLogin,
}) => {
  const classes = styles();
  return (
    <>
      <div>
        <p className={`${classes.textFont} ${classes.supportingText}`}>
          Or sign in with
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        <Button
          type="secondary_gray"
          text=""
          iconLeading="google-icon.svg"
          buttonStyle={classes.socialButton}
          onClick={() => onSocialLogin('google')}
        />
        <Button
          type="secondary_gray"
          text=""
          iconLeading="apple-icon.svg"
          buttonStyle={classes.socialButton}
          onClick={() => onSocialLogin('apple')}
        />
        <Button
          type="secondary_gray"
          text=""
          iconLeading="facebook-icon.svg"
          buttonStyle={classes.socialButton}
          onClick={() => onSocialLogin('facebook')}
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

  socialButton: {
    width: 101,
    height: 40,
  },
});
