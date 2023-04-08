import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/user.action';
import { logout } from '../services/auth.action';
import { selectUser, setUser } from '../store/slices/app.slice';
import { AvatarButton } from './avatar-button.component';
import { Button } from './button.component';
import { DropdownButton } from './dropdown-button.component';

const navigations = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'About Us',
    path: '/about-us',
  },
  {
    text: 'Learn More',
    path: '/learn-more',
  },
  {
    text: 'Industry News',
    path: '/industry-news',
  },
  {
    text: 'Contact Us',
    path: '/contact-us',
  },
];

export const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const classes = styles();
  const isAuth = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      getProfile().then((res) =>
        dispatch(
          setUser({
            ...res.data,
            property_photo: '/industry-news-image.png',
            photo: '/industry-news-image.png',
            photoImage: '/Kody Harrah Headshot.jpg',
          }),
        ),
      );
    }
  }, [isAuth]);

  const onLogoutHandler = () => {
    logout().then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.navContainer}>
        <img
          src={require('../assets/positive.png')}
          className={classes.logo}
          onClick={() => navigate('/')}
        />
        {navigations.map((e) => (
          <Button
            key={e.text}
            type="link_gray"
            text={e.text}
            buttonStyle={classes.navItem}
            onClick={() => navigate(e.path)}
          />
        ))}
      </div>

      {!isAuth && (
        <div className={classes.navContainer}>
          <DropdownButton
            text="Register"
            dropdownItemWidth={150}
            items={[
              {
                icon: 'user-01.svg',
                text: 'Land Owner',
                onClick: () => navigate('/land-owner/registration'),
              },
              {
                icon: 'users-01.svg',
                text: 'Service Provider',
                onClick: () => navigate('/service-company/registration'),
              },
            ]}
          />
          <Button
            text="Login"
            buttonStyle={classes.navButton}
            onClick={() => navigate('/login')}
          />
        </div>
      )}

      {isAuth && (
        <div className={classes.navContainer}>
          <AvatarButton
            name={
              user.user_data?.user_type === 'service_company'
                ? user.company_name
                : `${user.first_name} ${user.last_name}`
            }
            email={user.user_data?.email}
            photo={user.photoImage}
            onLogout={onLogoutHandler}
          />
        </div>
      )}
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 95,
    backgroundColor: '#ffffff',
    border: ['solid', 1, '#eaecf0'],
    paddingLeft: 80,
    paddingRight: 80,

    '-webkitUserSelect': 'none',
    '-msUserSelect': 'none',
    userSelect: 'none',
  },

  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  navItem: {
    marginLeft: 50,
    fontSize: 14,
    width: 'max-content',
    height: 20,
  },

  navButton: {
    marginLeft: 22,
    height: 40,
    width: 95,
    fontSize: 14,
  },

  logo: {
    width: 180,
    height: 60,
    objectFit: 'contain',
    marginBottom: 9,
  },
});
