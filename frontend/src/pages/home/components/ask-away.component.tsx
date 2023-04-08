import React from 'react';
import { createUseStyles } from 'react-jss';
import FreeHandIcon from '../../../assets/hand-drawn-arrow.svg';

type CustomProps = {
  onInquiry: Function;
};

export const AskAwayComponent: React.FC<CustomProps> = ({ onInquiry }) => {
  const classes = styles();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 80,
          marginTop: 51,
        }}
      >
        <span className={`${classes.textFont} ${classes.bottomText}`}>
          Uncertain? We are here to help!
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <span
            className={`${classes.textFont} ${classes.bottomText} ${classes.bottomTextStyle1}`}
            onClick={() => onInquiry()}
          >
            Ask Away!
          </span>
          <div
            style={{
              marginLeft: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <img src={FreeHandIcon} className={classes.arrow} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  marginTop: 30,
                }}
              >
                <span
                  className={`${classes.textFont} ${classes.bottomTextStyle2}`}
                >
                  Inquire
                </span>
                <span
                  className={`${classes.textFont} ${classes.bottomTextStyle2}`}
                >
                  about mineral
                </span>
              </div>
            </div>
          </div>
        </div>
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

  bottomText: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
  },

  bottomTextStyle1: {
    fontWeight: 'bold',
    color: '#4c7d9c',
    marginLeft: 5,
    textDecoration: 'underline',
    cursor: 'pointer',
  },

  bottomTextStyle2: {
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#62cdd9',
  },

  arrow: {
    height: 54,
  },
});
