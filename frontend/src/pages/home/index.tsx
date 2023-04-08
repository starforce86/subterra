import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import CheckIcon from '../../assets/check-icon.svg';
import { Button } from '../../components/button.component';
import { ImageCarousel } from '../../components/carousel.component';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { TextInput } from '../../components/text-input.component';
import { AskAwayComponent } from './components/ask-away.component';
import { InquiryModal } from './components/inquiry-modal.component';
import { RegistrationComponent } from './components/registation.component';

interface CustomProps {
  navigation?: any;
}

const checkedText = [
  'Increase value',
  'Easier to manage heirship',
  'Avoid forced pooling',
  'Avoid lost revenue',
];

const carouselImages = [
  '/Home page 1.jpg',
  '/Home page 2.jpg',
  '/Home page 3.jpg',
  '/Home page 4.jpg',
];

export const HomePage: React.FC<CustomProps> = ({ navigation }) => {
  const classes = styles();
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.homeImageContainer}>
        <div className={classes.carouselContainer}>
          <ImageCarousel
            images={carouselImages}
            containerClassStyle={classes.carousel}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', zIndex: 2 }}>
          <TextInput
            placeholder="Enter an address, neighborhood, location, or ZIP Code"
            inputStyle={classes.searchInput}
            icon="marker-pin-04.svg"
            onTextChange={(value: string) => {}}
          />
          <Button
            text="Search"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
        </div>
      </div>

      <div style={{ marginLeft: 80, marginRight: 80 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 17,
          }}
        >
          <span className={classes.headText}>Register now and enjoy</span>
          <span className={classes.headText}>
            no sign up fee and no monthly cost
          </span>
          <span className={classes.headText}>and enjoy these perks!</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 18,
          }}
        >
          {checkedText.map((e, i) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={i}
            >
              <img
                src={CheckIcon}
                style={{ height: 24, width: 24, marginRight: 12 }}
              />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#000',
                  marginRight: 28,
                }}
              >
                {e}
              </span>
            </div>
          ))}
        </div>

        <RegistrationComponent
          onLandOwnerClick={() => navigate('/land-owner/registration')}
          onServiceProviderClick={() =>
            navigate('/service-company/registration')
          }
        />

        <AskAwayComponent onInquiry={() => setInquiryModalVisible(true)} />

        <InquiryModal
          visible={inquiryModalVisible}
          onClose={() => setInquiryModalVisible(false)}
        />

        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  homeImageContainer: {
    position: 'relative',
    height: 380,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  carouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  carousel: {
    height: 380,
    width: '99vw',
  },

  searchInput: {
    width: 538,
  },

  headText: {
    fontFamily: 'Inter',
    fontSize: 48,
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: -0.96,
    textAlign: 'left',
    color: '#000000',
  },

  button: {
    width: 91,
    height: 40,
    marginLeft: 16,
  },

  footer: {
    marginTop: 149,
    borderTop: ['solid', 1, '#d0d5dd'],
  },
});
