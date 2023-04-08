import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/slices/app.slice';

export const ProfileComponent: React.FC = () => {
  const classes = styles();
  const user = useSelector(selectUser);

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  };

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={user.property_photo} className={classes.image} />
        <div className={`${classes.text} ${classes.imageInfo}`}>
          <div
            style={{
              margin: '14px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontWeight: 600 }}>
              {user.first_name} {user.last_name}
            </span>
            <span>{user.user_data?.email}</span>
            <span>
              {user.physical_street}, {user.physical_state_data?.name},{' '}
              {user.physical_zipcode}
            </span>
            <span>{user.owner_category}</span>
            <span>{formatPhoneNumber(user.cell_phone)}</span>
          </div>
        </div>
      </div>
      <div className={`${classes.text} ${classes.propertyDetailContainer}`}>
        <span className={classes.propertyHeader}>Property Overview</span>
        <span className={classes.propertyDetail}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos.
        </span>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    marginLeft: 30,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    width: 592,
  },

  imageContainer: {
    position: 'relative',
    height: 371,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  imageInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(24px)',
    '-webkitBackdropFilter': 'blur(24px)',
    color: '#fff',
    border: 'solid 1px rgba(255, 255, 255, 0.5)',
  },

  propertyDetailContainer: {
    marginTop: 21,
    display: 'flex',
    flexDirection: 'column',
  },

  propertyHeader: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'left',
    color: '#101828',
  },

  propertyDetail: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#475467',
    textAlign: 'justify',
  },
});
