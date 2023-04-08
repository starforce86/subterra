import React from 'react';
import { createUseStyles } from 'react-jss';
import { CardComponent } from './card.component';

type CustomProps = {
  currentItems: any[];
};

export const PaginatedCardComponent: React.FC<CustomProps> = ({
  currentItems,
}) => {
  const classes = styles();

  return (
    <div className={classes.headlines}>
      {currentItems.map((e, i) => (
        <div key={i} style={{ marginLeft: 16, marginRight: 16, marginTop: 48 }}>
          <CardComponent
            title={e.title}
            name={e.name}
            date={e.date}
            image={e.image}
            content={e.content}
            labels={e.labels}
            stopImageAutoPlay={true}
            imageStyle={classes.image}
          />
        </div>
      ))}
    </div>
  );
};

const styles = createUseStyles({
  headlines: {
    marginTop: 50,
    display: 'inline-grid',
    gridTemplateColumns: '1fr 1fr',
  },

  image: {
    height: 240,
    width: '100%',
  },
});
