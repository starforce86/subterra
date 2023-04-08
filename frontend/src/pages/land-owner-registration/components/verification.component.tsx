import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { ImageCarousel } from '../../../components/carousel.component';
import { CheckBoxInput } from '../../../components/check-box.component';

type CustomProps = {
  isAgree: boolean;
  onCheckboxChange: Function;
  onContinue: Function;
};

const carouselImages = [
  '/Owner Reg 1 man on computer.jpg',
  '/Owner Reg 2 couple on porch.jpg',
  '/Owner reg 3 couple in mountains_.jpg',
];

export const VerificationComponent: React.FC<CustomProps> = ({
  isAgree,
  onCheckboxChange,
  onContinue,
}) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <ImageCarousel
          images={carouselImages}
          containerClassStyle={classes.carousel}
        />
      </div>
      <div className={classes.bodyContainer}>
        <span className={`${classes.text} ${classes.header}`}>
          Land Owner Registration
        </span>

        <span className={`${classes.text} ${classes.supportingText}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos.
        </span>

        <CheckBoxInput
          checked={isAgree}
          onChange={() => onCheckboxChange()}
          inputStyle={classes.checkbox}
          text="I verify that all information is correct"
        />

        <Button
          text="Continue"
          buttonStyle={classes.button}
          onClick={() => onContinue()}
          disabled={!isAgree}
        />
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  imageContainer: {
    height: 380,
  },

  bodyContainer: {
    margin: '0px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 730,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  header: {
    marginTop: 17,
    fontSize: 36,
    fontWeight: 600,
    color: '#101828',
  },

  supportingText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#475467',
  },

  checkbox: {
    marginTop: 14,
    marginBottom: 25,
    color: '#344054',
  },

  button: {
    height: 41,
    width: 149,
    fontSize: 16,
    marginBottom: 150,
  },

  carousel: {
    height: 380,
    width: '100%',
  },
});
