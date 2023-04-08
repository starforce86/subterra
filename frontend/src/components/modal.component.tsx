import React from 'react';
import { createUseStyles } from 'react-jss';
import XBUTTON from '../assets/x-close.svg';

type CustomProps = {
  visible: boolean;
  title: string;
  description: string;
  icon: string;
  onClose: Function;
  children: React.ReactNode;
};

export const Modal: React.FC<CustomProps> = ({
  visible,
  title,
  description,
  icon,
  onClose,
  children,
}) => {
  const classes = styles();
  return (
    <>
      {visible && (
        <div className={classes.main}>
          <div className={classes.backgroundStyle}></div>
          <div className={classes.topContainer}>
            <div className={classes.mainContainer}>
              <div className={classes.headerStyle}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className={classes.headerIcon}>
                    <img
                      src={require(`../assets/${icon}`)}
                      className={classes.icon}
                    />
                  </div>
                  <div className={classes.headerDetails}>
                    <div className={classes.headerTitle}>{title}</div>
                    <div className={classes.headerDescription}>
                      {description}
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={XBUTTON}
                    className={classes.closeIcon}
                    onClick={() => onClose()}
                  />
                </div>
              </div>
              <div className={classes.divider}></div>
              <div className={classes.childrenStyle}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = createUseStyles({
  main: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 999,
  },

  backgroundStyle: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 0,
    backgroundColor: 'rgba(52, 64, 84, 0.7)',
    backdropFilter: 'blur(16px)',
    '-webkitBackdropFilter': 'blur(10px)',
  },

  mainContainer: {
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '0.375rem',
    minWidth: '350px',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 999,
  },

  divider: {
    height: 1,
    backgroundColor: '#eaecf0',
  },

  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    padding: 24,
  },

  headerIcon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    border: ['solid', 1, '#eaecf0'],
    marginRight: 15,
  },

  icon: {
    height: 24,
    width: 24,
  },

  closeIcon: {
    height: 24,
    width: 24,
    cursor: 'pointer',
  },

  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  headerTitle: {
    fontSize: 18,
    letterSpacing: 'normal',
    fontWeight: 600,
    fontFamily: 'Inter',
    color: '#101828',
  },

  headerDescription: {
    fontSize: 14,
    letterSpacing: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Inter',
    color: '#475467',
  },

  childrenStyle: {
    padding: 24,
  },
});
