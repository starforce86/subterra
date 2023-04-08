import React from 'react';
import { createUseStyles } from 'react-jss';
import { PropertyCardComponent } from './property-card.component';
import { Property } from './property-list.component';

type CustomProps = {
  currentItems: Property[];
};

export const PaginatedPropertyCardComponent: React.FC<CustomProps> = ({
  currentItems,
}) => {
  const classes = styles();

  const onEdit = (id: string) => {};

  const onDelete = (id: string) => {};

  return (
    <div className={classes.headlines}>
      {currentItems.map((e, i) => (
        <div key={i} style={{ marginLeft: 16, marginRight: 16, marginTop: 48 }}>
          <PropertyCardComponent
            id={e.id}
            name={e.name}
            description={e.description}
            alias={e.alias}
            legalDescription={e.legalDescription}
            address={e.address}
            state={e.state}
            county={e.county}
            minerals={e.minerals}
            comments={e.comments}
            documents={e.documents}
            activities={e.activities}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

const styles = createUseStyles({
  headlines: {
    display: 'inline-grid',
    gridTemplateColumns: '1fr 1fr',

    '@media (min-width: 1800px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },

  image: {
    height: 240,
    width: '100%',
  },
});
