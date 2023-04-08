import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import LogoutIcon from '../assets/log-out-01.svg';

type CustomProps = {
  name: string;
  email: string;
  photo?: string;
  onLogout: Function;
};

export const AvatarButton: React.FC<CustomProps> = ({
  name,
  email,
  photo,
  onLogout,
}): ReactElement => {
  const [visible, setVisible] = useState(false);
  const classes = styles();

  const navItem = [
    {
      text: 'Edit profile',
      icon: 'users-edit.svg',
      onClick: () => {},
    },
    {
      text: 'Settings',
      icon: 'settings-01.svg',
      onClick: () => {},
    },
    {
      text: 'Support',
      icon: 'help-circle.svg',
      onClick: () => {},
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            position: 'relative',
            width: 220,
          }}
        >
          <img
            src={photo}
            className={classes.avatar}
            onClick={() => setVisible(!visible)}
          />
          <span className={classes.avatarStatus} />
        </div>
        <div
          className={`${classes.dropdownContent} ${
            visible ? classes.dropdownContentVisible : ''
          }`}
          onMouseLeave={() => setVisible(false)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '12px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                position: 'relative',
                alignItems: 'center',
              }}
            >
              <img src={photo} className={classes.avatar} />
              <span className={classes.avatarStatus} />
            </div>
            <div className={classes.avatarInfo}>
              <span className={classes.avatarName}>{name}</span>
              <span className={classes.avatarEmail}>{email}</span>
            </div>
          </div>

          <div className={classes.divider}></div>

          {navItem.map((e) => (
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

          <div className={classes.divider}></div>

          <div className={classes.dropdownItem} onClick={() => onLogout()}>
            <img src={LogoutIcon} className={classes.dropdownItemIcon} />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <div className={classes.avatarInfo}>
        <span className={classes.avatarName}>{name}</span>
        <span className={classes.avatarEmail}>{email}</span>
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
    width: 220,
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

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    cursor: 'pointer',
    border: ['solid', 1, '#eaecf0'],
  },

  avatarStatus: {
    height: 10,
    width: 10,
    backgroundColor: '#0cbd06',
    borderRadius: 50,
    display: 'inline-block',
    position: 'absolute',
    border: ['solid', 1, '#eaecf0'],
    bottom: 0,
  },

  avatarInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 7,
  },

  avatarName: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 600,
    color: '#344054',
  },

  avatarEmail: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#475467',
  },

  divider: {
    borderBottom: ['solid', 1, '#eaecf0'],
  },
});
