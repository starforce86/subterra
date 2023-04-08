import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import EYE_OFF_ICON from '../assets/eye-off.svg';
import EYE_ICON from '../assets/eye.svg';

type InputTypeEnum = 'text' | 'password';

type CustomProps = {
  value?: string;
  placeholder?: string;
  type?: InputTypeEnum;
  icon?: string;
  inputStyle?: string;
  error?: boolean;
  onTextChange: Function;
  disabled?: boolean;
};

export const TextInput: React.FC<CustomProps> = ({
  value,
  placeholder = '',
  type = 'text',
  icon,
  inputStyle,
  error = false,
  onTextChange,
  disabled = false,
}: CustomProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [focus, setFocus] = useState(false);

  const classes = styles();

  const onToggleVisible = (): void => setVisible(!visible);

  const getFieldType = (): string => {
    if (type === 'password') {
      return visible ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div
      className={`${classes.textContainer} ${focus ? classes.active : ''} ${
        error ? classes.error : ''
      } ${error && focus ? classes.errorFocus : ''}`}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {icon && (
          <img src={require(`../assets/${icon}`)} className={classes.icon} />
        )}
      </div>
      <input
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        className={`${classes.input} ${inputStyle}`}
        type={getFieldType()}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="off"
        disabled={disabled}
      />
      {type === 'password' &&
        (visible ? (
          <img
            src={EYE_ICON}
            className={`${classes.icon} ${classes.eyeIcon}`}
            onClick={onToggleVisible}
          />
        ) : (
          <img
            src={EYE_OFF_ICON}
            className={`${classes.icon} ${classes.eyeIcon}`}
            onClick={onToggleVisible}
          />
        ))}
    </div>
  );
};

const styles = createUseStyles({
  textContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    border: ['solid', 1, '#d0d5dd'],
    width: 'max-content',
    paddingLeft: 10,
    paddingRight: 10,
  },

  active: {
    boxShadow: '0.5px 0.5px 5px 0.5px #2cbdff',
  },

  error: {
    border: ['solid', 1, '#f87165'],
  },

  errorFocus: {
    boxShadow: '0.5px 0.5px 5px 0.5px #f87165',
  },

  input: {
    width: 420,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    all: 'unset',
    '&:-webkit-autofill': {
      transition: 'background-color 600000s 0s, color 600000s 0s',
      outlineWidth: 0,
    },
    '&:-webkit-autofill:focus': {
      transition: 'background-color 600000s 0s, color 600000s 0s',
      outlineWidth: 0,
    },
    marginLeft: 10,
    marginRight: 10,
  },

  eyeIcon: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },

  icon: {
    height: 20,
    width: 20,
  },
});
