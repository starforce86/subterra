import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ImageCarousel } from '../../components/carousel.component';
import { login } from '../../services/auth.action';
import { FooterComponent } from './components/footer.component';
import { ForgotPasswordModal } from './components/forgot-password-modal.component';
import { LoginHeaderComponent } from './components/header.component';
import { InquiryModal } from './components/inquiry-modal.component';
import { LoginFormComponent } from './components/login-form.component';
import { RegistrationComponent } from './components/registation.component';
import { SocialLoginComponent } from './components/social-login.component';

interface CustomProps {
  navigation?: any;
}

const carouselImages = [
  'Login Page 1.jpg',
  'Login Page 2.jpg',
  'Login Page 3.jpg',
];

export const LoginPage: React.FC<CustomProps> = ({ navigation }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [remember, setRemember] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false);
  const classes = styles();
  const navigate = useNavigate();

  const onTextChange = (key: string, value: string) => {
    setLoginInfo({ ...loginInfo, [key]: value });
  };

  const signInHandler = () => {
    login(loginInfo.email, loginInfo.password).then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.key);
        localStorage.setItem('uid', res.data.user_id);
        localStorage.setItem(
          'utype',
          res.data.user_type === 'service_company'
            ? 'service_company'
            : 'land_owner',
        );
        window.location.reload();
      } else {
        toast.error('Invalid credentials');
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <LoginHeaderComponent />

        <div style={{ marginTop: 40 }}>
          <LoginFormComponent
            remember={remember}
            toggleRemember={() => setRemember(!remember)}
            onTextChange={onTextChange}
            onForgotPasswordClick={() => setForgotPasswordModalVisible(true)}
            onSigninClick={signInHandler}
            loginInfo={loginInfo}
          />

          <div style={{ marginTop: 10 }}>
            <RegistrationComponent
              onLandOwnerClick={() => navigate('/land-owner/registration')}
              onServiceProviderClick={() =>
                navigate('/service-company/registration')
              }
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <SocialLoginComponent onSocialLogin={(provider: string) => {}} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <FooterComponent onInquiry={() => setInquiryModalVisible(true)} />
          </div>
        </div>
      </div>
      <div style={{ width: '45%' }}>
        <ImageCarousel
          images={carouselImages}
          containerClassStyle={classes.carousel}
        />
      </div>

      <ForgotPasswordModal
        visible={forgotPasswordModalVisible}
        onClose={() => setForgotPasswordModalVisible(false)}
      />

      <InquiryModal
        visible={inquiryModalVisible}
        onClose={() => setInquiryModalVisible(false)}
      />
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '100vh',
    overflow: 'hidden',
  },

  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '55%',
    paddingTop: 40,
    overflowY: 'auto',
  },

  carousel: {
    height: '100vh',
    width: '100%',
  },
});
