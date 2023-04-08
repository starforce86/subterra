import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Pagination } from '../../../components/pagination.component';
import { getProperties } from '../../../services/property.action';
import { PaginatedPropertyCardComponent } from './paginated-property-card.component';

type Activity = {
  serviceCompanyName: string;
  activity: string;
};

export type Property = {
  id: string;
  name: string;
  description: string;
  alias: string;
  legalDescription: string;
  address: string;
  state: Record<string, any>;
  county: Record<string, any>;
  city?: Record<string, any>;
  minerals: string[];
  comments: string;
  documents: string[];
  activities: Activity[];
};

type CustomProps = {
  isActive: boolean;
};

export const PropertyListComponent: React.FC<CustomProps> = ({ isActive }) => {
  const classes = styles();
  const [properties, setProperties] = useState([] as Property[]);

  useEffect(() => {
    getProperties().then((res) => {
      setProperties(
        res.data?.results?.map((e: any) => ({
          id: e.id,
          name: 'Property Name',
          description: 'This is the property details',
          alias: e.alias,
          legalDescription: e.legal_description,
          address: e.property_address,
          state: {
            value: e.state_data.id,
            label: e.state_data.name,
          },
          county: {
            value: e.county_data.id,
            label: e.county_data.name,
          },
          city: {
            value: e.property_city,
          },
          minerals: e.minerals_data,
          comments: e.comments,
          documents: e.documents_data,
          activities: [],
          // {
          //   serviceCompanyName: 'Service Company 01',
          //   activity: 'This is their activity',
          // }
        })) || [],
      );
    });
  }, [isActive]);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>Property Overview</span>
        <Button text="Add" buttonStyle={classes.button} onClick={() => {}} />
      </div>

      <Pagination
        items={properties}
        itemsPerPage={2}
        Element={PaginatedPropertyCardComponent}
      />
    </div>
  );
};

const styles = createUseStyles({
  container: {
    margin: 30,
    marginBottom: 0,
    width: '100%',
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },

  button: {
    width: 73,
    height: 36,
  },
});
