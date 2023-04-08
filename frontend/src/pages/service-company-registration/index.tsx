import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { RegistrationComponent } from './components/registration.component';
import { VerificationComponent } from './components/verification.component';

interface CustomProps {
  navigation?: any;
}

export const ServiceCompanyRegistrationPage: React.FC<CustomProps> = ({
  navigation,
}) => {
  const classes = styles();
  const [agreeVerification, setAgreeVerification] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const onBackHandler = () => {
    setAgreeVerification(false);
    setAgreed(false);
  };

  return (
    <div className={classes.container}>
      <Header />

      {!agreed && (
        <VerificationComponent
          isAgree={agreeVerification}
          onCheckboxChange={() => setAgreeVerification(!agreeVerification)}
          onContinue={() => setAgreed(true)}
        />
      )}

      {!!agreed && <RegistrationComponent onBack={onBackHandler} />}

      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  footer: {
    marginLeft: 80,
    marginRight: 80,
    borderTop: ['solid', 1, '#d0d5dd'],
  },
});
