import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

type CustomProps = {
  value?: string;
  placeholder?: string;
  inputStyle?: string;
  onTextChange: Function;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
};

export const TextAreaInput: React.FC<CustomProps> = ({
  value,
  placeholder = '',
  inputStyle,
  onTextChange,
  rows = 3,
  disabled = false,
  error = false,
}: CustomProps): ReactElement => {
  const [focus, setFocus] = useState(false);

  const classes = styles();

  return (
    <div
      className={`${classes.textContainer} ${focus ? classes.active : ''} ${
        error ? classes.error : ''
      } ${error && focus ? classes.errorFocus : ''}`}
    >
      <textarea
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        className={`${classes.input} ${inputStyle}`}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="off"
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
};

const styles = createUseStyles({
  textContainer: {
    height: 'max-content',
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
    padding: '15px 10px',
  },

  active: {
    boxShadow: '0.5px 0.5px 5px 0.5px #2cbdff',
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

  error: {
    border: ['solid', 1, '#f87165'],
  },

  errorFocus: {
    boxShadow: '0.5px 0.5px 5px 0.5px #f87165',
  },
});
