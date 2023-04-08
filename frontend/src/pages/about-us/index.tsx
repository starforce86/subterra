import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import { Button } from '../../components/button.component';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { CardComponent } from './components/card.component';

interface CustomProps {
  navigation?: any;
}

const cardData = [
  {
    name: 'Jim OReilly',
    image: '/Jim OReilly Headshot.jpg',
    position: 'Position',
    description:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks',
    twitterLink: '',
    linkedinLink: '',
    dribbleLink: '',
  },
  {
    name: 'Kody Harrah',
    image: '/Kody Harrah Headshot.jpg',
    position: 'Position',
    description:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks',
    twitterLink: '',
    linkedinLink: '',
    dribbleLink: '',
  },
  {
    name: 'John Smith',
    image:
      'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916__340.png',
    position: 'Position',
    description:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks',
    twitterLink: '',
    linkedinLink: '',
    dribbleLink: '',
  },
  {
    name: 'John Smith',
    image:
      'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916__340.png',
    position: 'Position',
    description:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks',
    twitterLink: '',
    linkedinLink: '',
    dribbleLink: '',
  },
];

export const AboutUsPage: React.FC<CustomProps> = ({ navigation }) => {
  const classes = styles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.bodyContainer}>
        <div style={{ marginTop: 44, marginBottom: 12 }}>
          <span className={`${classes.text} ${classes.aboutUsText}`}>
            About us
          </span>
        </div>
        <div
          style={{ marginBottom: 24, display: 'flex', flexDirection: 'column' }}
        >
          <span className={`${classes.text} ${classes.header}`}>
            This is a mock headline.
          </span>
          <span className={`${classes.text} ${classes.header}`}>
            Company mission and values.
          </span>
        </div>
        <div style={{ marginBottom: 44, minWidth: 864, maxWidth: 900 }}>
          <span className={classes.supportingText}>
            Subterra Data Services exists to create a seamless and easy way to
            track mineral right ownership while managing heirship of minerals.
            We have created an online marketplace to simply buy and sell
            sub-surface, connecting owners with the best land companies in the
            nation.
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 83 }}>
          <div style={{ minWidth: 300, maxWidth: 650 }}>
            <span className={`${classes.text} ${classes.ourTeamText}`}>
              Our team
            </span>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.header2}`}>
                Leadership team
              </span>
            </div>
            <div style={{ marginTop: 20 }}>
              <span className={`${classes.text} ${classes.supportingText}`}>
                The leadership of Subterra Data Services is a mix of IT data and
                oil and gas industry experts. Our goal is to create an
                environment where mineral owners have a single-entry point into
                everything they need to manage, learn and execute transactions
                to drive revenue from their assets.
              </span>
            </div>
            <div style={{ marginTop: 40 }}>
              <Button
                text="Learn More"
                buttonStyle={classes.button}
                onClick={() => navigate('/learn-more')}
              />
            </div>
          </div>
          <div className={classes.teamMember}>
            {cardData.map((e, i) => (
              <CardComponent
                key={i}
                name={e.name}
                image={e.image}
                position={e.position}
                description={e.description}
                twitterLink={e.twitterLink}
                linkedinLink={e.linkedinLink}
                dribbleLink={e.dribbleLink}
              />
            ))}
          </div>
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
    flexDirection: 'column',
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontStretch: 'normal',
    textAlign: 'left',
  },

  aboutUsText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#336b8e',
  },

  ourTeamText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#4c7d9c',
  },

  header: {
    fontSize: 48,
    fontWeight: 600,
    color: '#101828',
  },

  supportingText: {
    fontSize: 20,
    letterSpacing: 0,
    color: '#475467',
  },

  header2: {
    fontSize: 36,
    fontWeight: 600,
    color: '#101828',
  },

  button: {
    height: 48,
    width: 128,
    fontSize: 16,
  },

  teamMember: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto auto',
    marginLeft: 96,
    gridGap: 45,
    marginBottom: 100,
  },

  footer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 56,
    borderTop: ['solid', 1, '#d0d5dd'],
  },
});
