import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../components/button.component';
import { ImageCarousel } from '../../components/carousel.component';
import { CheckBoxInput } from '../../components/check-box.component';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { TextAreaInput } from '../../components/text-area.component';
import { TextInput } from '../../components/text-input.component';

interface CustomProps {
  navigation?: any;
}

const carouselImages = ['/Contact Us 1.jpg', '/Contact Us 2.jpg'];

export const ContactUsPage: React.FC<CustomProps> = ({ navigation }) => {
  const classes = styles();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [agreePolicy, setAgreePolicy] = useState(false);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.bodyContainer}>
        <div className={classes.bodyLeft}>
          <span className={`${classes.text} ${classes.header}`}>
            Get in touch
          </span>
          <span className={`${classes.text} ${classes.supportingText}`}>
            Supporting copy
          </span>
          <div className={classes.nameFieldContainer}>
            <div>
              <div className={`${classes.text} ${classes.fieldLabel}`}>
                <span>First Name</span>
              </div>
              <TextInput
                placeholder="John"
                inputStyle={classes.nameField}
                value={data.firstname}
                onTextChange={(value: string) =>
                  setData({ ...data, firstname: value })
                }
              />
            </div>
            <div>
              <div className={`${classes.text} ${classes.fieldLabel}`}>
                <span>Last Name</span>
              </div>
              <TextInput
                placeholder="Smith"
                inputStyle={classes.nameField}
                value={data.lastname}
                onTextChange={(value: string) =>
                  setData({ ...data, lastname: value })
                }
              />
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className={`${classes.text} ${classes.fieldLabel}`}>
              <span>Email</span>
            </div>
            <TextInput
              placeholder="user@email.com"
              inputStyle={classes.textField}
              value={data.email}
              onTextChange={(value: string) =>
                setData({ ...data, email: value })
              }
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <div className={`${classes.text} ${classes.fieldLabel}`}>
              <span>Phone Number</span>
            </div>
            <TextInput
              placeholder="+1 208-528-8735"
              inputStyle={classes.textField}
              value={data.phoneNumber}
              onTextChange={(value: string) =>
                setData({ ...data, phoneNumber: value })
              }
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <div className={`${classes.text} ${classes.fieldLabel}`}>
              <span>Message</span>
            </div>
            <TextAreaInput
              placeholder="Leave us a message..."
              inputStyle={classes.textField}
              value={data.message}
              rows={5}
              onTextChange={(value: string) =>
                setData({ ...data, message: value })
              }
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <CheckBoxInput
              checked={agreePolicy}
              onChange={() => setAgreePolicy(!agreePolicy)}
              text="You agree to our privacy policy."
            />
          </div>

          <div style={{ marginTop: 32 }}>
            <Button
              text="Send Message"
              buttonStyle={classes.button}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={classes.bodyRight}>
          <ImageCarousel
            images={carouselImages}
            containerClassStyle={classes.carousel}
          />
        </div>
      </div>
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

  bodyContainer: {
    margin: '0px 80px',
    display: 'flex',
    flexDirection: 'row',
  },

  bodyLeft: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 125,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  header: {
    marginTop: 49,
    fontSize: 36,
    fontWeight: 600,
    color: '#101828',
  },

  supportingText: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: 'normal',
    color: '#475467',
  },

  nameFieldContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fieldLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500,
    color: '#344054',
  },

  nameField: {
    width: 200,
  },

  textField: {
    width: 473,
  },

  button: {
    height: 48,
    width: 515,
    fontSize: 16,
  },

  bodyRight: {},

  footer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 56,
    borderTop: ['solid', 1, '#d0d5dd'],
  },

  carousel: {
    width: 638,
    height: 780,
  },
});
