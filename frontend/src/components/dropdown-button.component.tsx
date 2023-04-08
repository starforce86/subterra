import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from './button.component';

type DropdownItem = {
  text: string;
  icon?: string;
  onClick: Function;
};

type CustomProps = {
  text: string;
  buttonStyle?: string;
  items: DropdownItem[];
  dropdownItemWidth?: number;
};
export const DropdownButton: React.FC<CustomProps> = ({
  text,
  buttonStyle,
  items,
  dropdownItemWidth,
}): ReactElement => {
  const [visible, setVisible] = useState(false);
  const classes = styles();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          width: dropdownItemWidth,
        }}
      >
        <Button
          type="secondary_gray"
          text={text}
          iconTrailing="chevron-down.svg"
          buttonStyle={`${classes.button} ${buttonStyle}`}
          onClick={() => setVisible(!visible)}
        />
      </div>
      <div
        className={`${classes.dropdownContent} ${
          visible ? classes.dropdownContentVisible : ''
        }`}
        style={{ width: dropdownItemWidth }}
        onMouseLeave={() => setVisible(false)}
      >
        {items.map((e) => (
          <div
            key={e.text}
            className={classes.dropdownItem}
            onClick={() => e.onClick()}
          >
            {e.icon && (
              <img
                src={require(`../assets/${e.icon}`)}
                className={classes.dropdownItemIcon}
              />
            )}
            <span>{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = createUseStyles({
  button: {
    width: 117,
    height: 40,
    fontSize: 14,
  },

  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: '#fff',
    border: ['solid', 1, '#eaecf0'],
    borderRadius: 8,
    marginTop: 6,
    zIndex: 1,

    '-webkitUserSelect': 'none',
    '-msUserSelect': 'none',
    userSelect: 'none',
  },

  dropdownContentVisible: {
    display: 'block',
    zIndex: 999,
  },

  dropdownItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Inter',
    color: '#344054',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    '&:hover': {
      backgroundColor: '#f9fafb',
    },
  },

  dropdownItemIcon: {
    height: 16,
    width: 16,
    marginRight: 5,
  },
});
