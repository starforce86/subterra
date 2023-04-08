import React from 'react';
import { createUseStyles } from 'react-jss';
import { ImageCarousel } from '../../components/carousel.component';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { CardComponent } from './components/card.component';

interface CustomProps {
  navigation?: any;
}

const carouselImages = ['Learn More 1_.jpg', 'Learn More 2_.jpg'];

const cardData = [
  {
    title: 'Learn more item 1',
    description:
      'Store, manage and track mineral information in a single repository with the capability to save documents related to ownership.',
    link: '/',
  },
  {
    title: 'Heirship',
    description:
      'Use Subterra Data Services to create an “ancestry” of people who will receive ownership at the time of an inheritance event.',
    link: '/',
  },
  {
    title: 'Energy / Land Marketplace',
    description:
      'Subterra Data Services provides a clearinghouse for any type of transaction related to the industry. Vetted relationships between land owners and professional services companies is the value we create by leveraging industry experience and a nation-wide network of experts.',
    link: '/',
  },
];

export const LearnMorePage: React.FC<CustomProps> = ({ navigation }) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.bodyContainer}>
        <div style={{ marginTop: 44, marginBottom: 12 }}>
          <span className={`${classes.text} ${classes.learnMoreText}`}>
            Learn More
          </span>
        </div>
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span className={`${classes.text} ${classes.header}`}>
            Connecting Mineral Owners, Buyers,
          </span>
          <span className={`${classes.text} ${classes.header}`}>
            Sellers and Professionals for every
          </span>
          <span className={`${classes.text} ${classes.header}`}>
            aspect of the Oil, Gas and Land
          </span>
          <span className={`${classes.text} ${classes.header}`}>Industry.</span>
        </div>
        <div style={{ marginBottom: 44, minWidth: 864, maxWidth: 900 }}>
          <span className={classes.supportingText}>
            Most mineral owners don’t know the value of the assets they hold.
            Subterra Data Services was created to assist in the valuation of
            mineral, land and rare earth minerals. One-button access to a
            network of buyers and sellers simplifies transactions and puts money
            in the hands of owners quickly and seamlessly.
          </span>
        </div>

        <div style={{ marginBottom: 50 }}>
          <ImageCarousel
            images={carouselImages}
            containerClassStyle={classes.carousel}
          />
        </div>

        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: 'auto auto auto',
            gridGap: 25,
          }}
        >
          {cardData.map((e, i) => (
            <CardComponent
              key={i}
              title={e.title}
              description={e.description}
              link={e.link}
            />
          ))}
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

  learnMoreText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#336b8e',
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

  footer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 56,
    borderTop: ['solid', 1, '#d0d5dd'],
  },

  carousel: {
    height: 590,
    width: '100%',
  },
});
