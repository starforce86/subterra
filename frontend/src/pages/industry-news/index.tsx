import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { Pagination } from '../../components/pagination.component';
import { CardComponent } from './components/card.component';
import { PaginatedCardComponent } from './components/paginated-card.component';

interface CustomProps {
  navigation?: any;
}

const latestTempHeadline = {
  title: 'This is the title',
  name: 'Kody Harrah',
  date: '20 Jan 2022',
  image: ['Industry News 1 Pipeline.jpg', 'Industry News 2 Rigs and Data.jpg'],
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
  labels: ['Product', 'Research', 'Minerals', 'Business'],
};

const tempHeadlines = [
  {
    title: 'This is the title',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: [
      'Industry News 1 Pipeline.jpg',
      'Industry News 2 Rigs and Data.jpg',
    ],
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product', 'Research', 'Minerals', 'Business'],
  },
  {
    title: 'This is the title1',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product', 'Research', 'Business'],
  },
  {
    title: 'This is the title2',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product', 'Minerals', 'Business'],
  },
  {
    title: 'This is the title3',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Minerals', 'Business'],
  },
  {
    title: 'This is the title4',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product'],
  },
  {
    title: 'This is the title5',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product', 'Minerals', 'Business'],
  },
  {
    title: 'This is the title6',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Minerals', 'Business'],
  },
  {
    title: 'This is the title7',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product'],
  },
  {
    title: 'This is the title8',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product'],
  },
  {
    title: 'This is the title9',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product', 'Minerals', 'Business'],
  },
  {
    title: 'This is the title10',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Minerals', 'Business'],
  },
  {
    title: 'This is the title11',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product'],
  },
  {
    title: 'This is the title12',
    name: 'Kody Harrah',
    date: '20 Jan 2022',
    image: '/industry-news-image.png',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.',
    labels: ['Product'],
  },
];

export const IndustryNewsPage: React.FC<CustomProps> = ({ navigation }) => {
  const classes = styles();
  const [headlines, setHeadlines] = useState([] as any);
  const [latestHeadline, setLatestHeadline] = useState(null as any);

  useEffect(() => {
    setLatestHeadline(latestTempHeadline);
    setHeadlines(tempHeadlines);
  }, []);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.bodyContainer}>
        <div style={{ marginTop: 44, marginBottom: 12 }}>
          <span className={`${classes.text} ${classes.aboutUsText}`}>
            Industry News
          </span>
        </div>
        <div
          style={{ marginBottom: 24, display: 'flex', flexDirection: 'column' }}
        >
          <span className={`${classes.text} ${classes.header}`}>
            This is a mock headline.
          </span>
          <span className={`${classes.text} ${classes.header}`}>
            Contents relevant to industry news.
          </span>
        </div>
        <div style={{ marginBottom: 44, minWidth: 864, maxWidth: 900 }}>
          <span className={classes.supportingText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </span>
        </div>

        <div style={{ marginTop: 29 }}>
          {latestHeadline && (
            <CardComponent
              title={latestHeadline.title}
              name={latestHeadline.name}
              date={latestHeadline.date}
              image={latestHeadline.image}
              content={latestHeadline.content}
              labels={latestHeadline.labels}
              imageStyle={classes.image}
            />
          )}
        </div>

        <Pagination
          items={headlines}
          itemsPerPage={4}
          Element={PaginatedCardComponent}
        />
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

  image: {
    height: 600,
    width: '100%',
  },

  footer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 56,
    borderTop: ['solid', 1, '#d0d5dd'],
  },
});
