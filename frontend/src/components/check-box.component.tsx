import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

type CustomProps = {
  checked: boolean;
  onChange: Function;
  text: string;
  inputStyle?: string;
};
export const CheckBoxInput: React.FC<CustomProps> = ({
  checked,
  onChange,
  text,
  inputStyle,
}): ReactElement => {
  const classes = styles();

  return (
    <div
      className={`${classes.container} ${inputStyle}`}
      onClick={() => onChange()}
    >
      <input
        type="checkbox"
        checked={checked}
        style={{ cursor: 'pointer', marginRight: 8 }}
        onChange={() => {}}
      />
      <span>{text}</span>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',

    '-webkitUserSelect': 'none',
    '-msUserSelect': 'none',
    userSelect: 'none',
  },
});
