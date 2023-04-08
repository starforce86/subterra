import React from 'react';
import { createUseStyles } from 'react-jss';
import ChevronRight from '../../../assets/chevron-right.svg';
import HomeLine from '../../../assets/home-line.svg';

type BreadcrumbItem = {
  text: string;
  id: number;
  onClick?: Function;
};

type CustomProps = {
  items: BreadcrumbItem[];
  activeId: number;
};

export const BreadcrumbComponent: React.FC<CustomProps> = ({
  items,
  activeId,
}) => {
  const classes = styles();
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <img src={HomeLine} className={classes.homeIcon} />
        {items.map((e) => (
          <div
            style={{ display: 'flex', flexDirection: 'row', marginRight: 13 }}
            key={e.id}
          >
            <img src={ChevronRight} className={classes.arrowIcon} />
            <span
              className={`${classes.text} ${
                e.id === activeId ? classes.active : ''
              }`}
            >
              {e.text}
            </span>
          </div>
        ))}
      </div>
      <div className={classes.label}>
        Step {activeId} of {items.length}
      </div>
    </div>
  );
};

const styles = createUseStyles({
  main: {
    margin: '0 80px',
    marginTop: 18,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },

  homeIcon: {
    height: 20,
    width: 20,
    marginRight: 13,
  },

  arrowIcon: {
    height: 16,
    width: 16,
    marginRight: 13,
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#d0d5dd',
  },

  active: {
    fontWeight: '600',
    color: '#336b8e',
  },

  label: {
    marginTop: 27,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#000000',
  },
});
