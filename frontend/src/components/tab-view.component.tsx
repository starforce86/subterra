import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type TabItem = {
  id: string;
  text: string;
  element: ReactNode;
  onSelect: Function;
};

type CustomProps = {
  tabs: TabItem[];
  activePage: string;
  tabStyle?: string;
};

export const TabView: React.FC<CustomProps> = ({
  tabs,
  activePage,
  tabStyle,
}: CustomProps) => {
  const classes = styles();

  return (
    <div className={`${classes.container} ${tabStyle}`}>
      <div className={classes.tab}>
        {tabs.map((e) => (
          <span
            key={e.id}
            className={`${activePage === e.id ? classes.active : ''} ${
              classes.text
            } ${classes.tabHeader}`}
            onClick={() => e.onSelect()}
          >
            {e.text}
          </span>
        ))}
      </div>
      <div className={classes.divider}></div>
      <div className={classes.body}>
        {tabs
          .filter((e) => e.id === activePage)
          .map((e, i) => (
            <div key={i}>{e.element}</div>
          ))}
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    minWidth: 'max-content',
    minHeight: '70vh',
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    textAlign: 'left',
  },

  tab: {
    display: 'flex',
    flexDirection: 'row',
  },

  tabHeader: {
    marginRight: 22,
    color: '#667085',
    fontWeight: 600,
    padding: '0px 5px',
    paddingBottom: 5,
    cursor: 'pointer',
  },

  active: {
    color: '#336b8e',
    borderBottom: ['solid', 2, '#336b8e'],
  },

  divider: {
    borderBottom: ['solid', 1, '#eaecf0'],
  },

  body: {
    marginTop: 23,
  },
});
