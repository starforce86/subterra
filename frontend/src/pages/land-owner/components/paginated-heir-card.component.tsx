import React from 'react';
import { createUseStyles } from 'react-jss';
import { HeirCardComponent } from './heir-card.component';
import { Heir } from './heir-list.component';

type CustomProps = {
  currentItems: Heir[];
};

export const PaginatedHeirCardComponent: React.FC<CustomProps> = ({
  currentItems,
}) => {
  const classes = styles();

  return (
    <div className={classes.headlines}>
      {currentItems.map((e, i) => (
        <div key={i} style={{ marginLeft: 16, marginRight: 16, marginTop: 48 }}>
          <HeirCardComponent
            name={e.name}
            description={e.description}
            relationship={e.relationship}
            type={e.type}
            firstname={e.firstname}
            lastname={e.lastname}
            deceased={e.deceased}
            diedIn={e.diedIn}
            yearOfDeath={e.yearOfDeath}
            estateProbated={e.estateProbated}
            probateState={e.probateState}
            documents={e.documents}
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
