import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type CustomProps = {
  images: string[];
  containerClassStyle?: string;
  stopAutoPlay?: boolean;
};

export const ImageCarousel: React.FC<CustomProps> = ({
  images,
  containerClassStyle = '',
  stopAutoPlay = false,
}: CustomProps): ReactElement => {
  const classes = styles();

  return (
    <div className={`${classes.container} ${containerClassStyle}`}>
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        autoPlay={!stopAutoPlay}
        animationHandler="fade"
        interval={5000}
        transitionTime={1500}
        infiniteLoop={true}
      >
        {images.map((e, i) => (
          <div key={i} className={containerClassStyle}>
            <img src={e} style={{ objectFit: 'cover', height: '100%' }} />
          </div>
        ))}
      </Carousel>
      {}
    </div>
  );
};

const styles = createUseStyles({
  container: {},
});
