import React from 'react';
import { createUseStyles } from 'react-jss';

type SidebarItem = {
  icon?: string;
  text: string;
  active: boolean;
  onClick: Function;
};

type CustomProps = {
  items: SidebarItem[];
};

export const SidebarComponent: React.FC<CustomProps> = ({
  items,
}: CustomProps) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      {items.map((e, i) => (
        <div
          className={`${classes.navItem} ${e.active ? classes.active : ''}`}
          key={i}
          onClick={() => e.onClick()}
        >
          {e.icon && (
            <img
              src={require(`../assets/${e.icon}`)}
              className={classes.navItemIcon}
            />
          )}
          <span className={classes.navText}>{e.text}</span>
        </div>
      ))}
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    padding: 13,
  },

  navItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 13px',
    borderRadius: 6,

    '&:hover': {
      backgroundColor: '#f9fafb',
    },
  },

  navItemIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  navText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#101828',
  },

  active: {
    backgroundColor: '#f9fafb',
  },
});
