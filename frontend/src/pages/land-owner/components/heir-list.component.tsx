import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Pagination } from '../../../components/pagination.component';
import { AddHeirModal } from './add-heir-modal.component';
import { HeirCardProps } from './heir-card.component';
import { PaginatedHeirCardComponent } from './paginated-heir-card.component';

export type HeirType = 'Previous' | 'Potential';

export type Heir = {
  name: string;
  description: string;
  relationship: string;
  type: HeirType;
  firstname: string;
  lastname: string;
  deceased: boolean;
  diedIn: string;
  yearOfDeath: number;
  estateProbated: boolean;
  probateState: boolean;
  documents: string[];
};

export type HeirPotential = {
  name: string;
  description: string;
  type: HeirType;
  relationship: string;
  age: number;
  firstname: string;
  lastname: string;
  includedInWill: boolean;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  documents: string[];
};

type CustomProps = {
  isActive: boolean;
};

export const HeirListComponent: React.FC<CustomProps> = ({ isActive }) => {
  const classes = styles();
  const [heirs, setHeirs] = useState([] as Partial<HeirCardProps>[]);
  const [addHeirModalVisible, setAddHeirModalVisible] = useState(false);

  useEffect(() => {
    setHeirs([
      {
        name: 'Heirs Name',
        description: 'This is the heir details',
        relationship: 'Parent',
        type: 'Previous',
        firstname: 'George',
        lastname: 'Caldwell',
        deceased: true,
        diedIn: 'Oklahoma',
        yearOfDeath: 1989,
        estateProbated: true,
        probateState: true,
        documents: ['Document 01', 'Document 02'],
      },
      {
        name: 'Heirs Name',
        description: 'This is the heir details',
        relationship: 'Parent',
        type: 'Previous',
        firstname: 'George',
        lastname: 'Caldwell',
        deceased: true,
        diedIn: 'Oklahoma',
        yearOfDeath: 1989,
        estateProbated: true,
        probateState: true,
        documents: ['Document 01', 'Document 02', 'Document 03'],
      },
      {
        name: 'Heirs Name',
        description: 'This is the heir details',
        relationship: 'Parent',
        type: 'Previous',
        firstname: 'George',
        lastname: 'Caldwell',
        deceased: true,
        diedIn: 'Oklahoma',
        yearOfDeath: 1989,
        estateProbated: true,
        probateState: true,
        documents: ['Document 01', 'Document 02'],
      },
    ]);
  }, [isActive]);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>Heirs</span>
        <Button
          text="Add"
          buttonStyle={classes.button}
          onClick={() => setAddHeirModalVisible(true)}
        />
      </div>

      <Pagination
        items={heirs}
        itemsPerPage={2}
        Element={PaginatedHeirCardComponent}
      />

      <AddHeirModal
        visible={addHeirModalVisible}
        onClose={() => setAddHeirModalVisible(false)}
        onSubmit={() => {}}
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
