import React from 'react';
import { createUseStyles } from 'react-jss';
import ArrowUpRight from '../../../assets/arrow-up-right.svg';
import { ImageCarousel } from '../../../components/carousel.component';

type LabelType = 'product' | 'business' | 'minerals' | 'research';

type CustomProps = {
  name: string;
  image: string | string[];
  title: string;
  content: string;
  labels: string[];
  date: string;
  stopImageAutoPlay?: boolean;
  imageStyle: string;
};

export const CardComponent: React.FC<CustomProps> = ({
  name,
  image,
  title,
  content,
  labels,
  date,
  stopImageAutoPlay = false,
  imageStyle,
}) => {
  const classes = styles();

  const getLabelType = (label: string): LabelType => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel === 'business') {
      return 'business';
    } else if (lowerLabel === 'research') {
      return 'research';
    } else if (lowerLabel === 'minerals') {
      return 'minerals';
    }

    return 'product';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ImageCarousel
        images={Array.isArray(image) ? image : [image]}
        containerClassStyle={imageStyle}
        stopAutoPlay={stopImageAutoPlay}
      />
      <div style={{ marginTop: 32 }}>
        <span className={classes.name}>{`${name} • ${date}`}</span>
      </div>
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className={classes.title}>{title}</span>
        <img src={ArrowUpRight} className={classes.icon} />
      </div>
      <div style={{ marginTop: 8 }}>
        <span className={classes.content}>{content}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {labels.map((e, i) => (
          <div
            className={`${classes.label} ${classes[getLabelType(e)]}`}
            key={i}
          >
            <span>{e}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = createUseStyles({
  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontStretch: 'normal',
    textAlign: 'left',
  },

  name: {
    fontSize: 14,
    fontWeight: 600,
    color: '#336b8e',
  },

  title: {
    fontSize: 30,
    fontWeight: 600,
    color: '#101828',
  },

  content: {
    fontSize: 16,
    color: '#475467',
  },

  label: {
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 500,
    padding: '3px 8px',
    marginRight: 8,
    marginTop: 24,
  },

  product: {
    backgroundColor: '#e0e7ed',
    color: '#336b8e',
  },

  research: {
    backgroundColor: '#eef4ff',
    color: '#3538cd',
  },

  minerals: {
    backgroundColor: '#fff1f3',
    color: '#c01048',
  },

  business: {
    backgroundColor: '#fdf2fa',
    color: '#c11574',
  },

  icon: {
    height: 24,
    width: 24,
    cursor: 'pointer',
  },
});
