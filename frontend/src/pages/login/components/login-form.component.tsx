import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { TextInput } from '../../../components/text-input.component';

type CustomProps = {
  remember: boolean;
  toggleRemember: Function;
  onTextChange: Function;
  onForgotPasswordClick: Function;
  onSigninClick: Function;
  loginInfo: {
    email: string;
    password: string;
  };
};

export const LoginFormComponent: React.FC<CustomProps> = ({
  remember,
  toggleRemember,
  onTextChange,
  onForgotPasswordClick,
  onSigninClick,
  loginInfo,
}) => {
  const classes = styles();
  return (
    <>
      <div>
        <span className={`${classes.textFont} ${classes.fieldLabel}`}>
          Email
        </span>
        <TextInput
          icon="mail-01.svg"
          placeholder="Enter your Email"
          inputStyle={classes.emailInput}
          value={loginInfo.email}
          onTextChange={(value: string) => onTextChange('email', value)}
        />
      </div>
      <form style={{ marginBottom: 10 }}>
        <span className={`${classes.textFont} ${classes.fieldLabel}`}>
          Password
        </span>
        <TextInput
          icon="lock-01.svg"
          placeholder="Enter Password"
          type="password"
          value={loginInfo.password}
          inputStyle={classes.passwordInput}
          onTextChange={(value: string) => onTextChange('password', value)}
        />
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <CheckBoxInput
          checked={remember}
          onChange={() => toggleRemember()}
          text="Remember for 30 days"
        />
        <Button
          type="link_color"
          text="Forgot Password"
          buttonStyle={classes.forgotPassword}
          onClick={() => onForgotPasswordClick()}
        />
      </div>
      <div style={{ marginBottom: 30 }}>
        <Button
          text="Sign in"
          buttonStyle={classes.button}
          onClick={() => onSigninClick()}
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

  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    lineHeight: 2,
  },

  emailInput: {
    width: 316,
  },

  passwordInput: {
    width: 296,
  },

  forgotPassword: {
    width: 120,
    height: 20,
    fontSize: 14,
  },

  button: {
    width: 376,
    height: 44,
  },
});
