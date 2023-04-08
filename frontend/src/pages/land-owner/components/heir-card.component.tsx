import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Tag } from '../../../components/tag.component';
import { AddWillModal } from './add-will-modal.component';
import { Heir, HeirPotential } from './heir-list.component';

export type HeirCardProps = Heir & HeirPotential;

export const HeirCardComponent: React.FC<Partial<HeirCardProps>> = ({
  name,
  description,
  relationship,
  type,
  firstname,
  lastname,
  deceased,
  diedIn,
  yearOfDeath,
  estateProbated,
  probateState,
  documents,
}: Partial<HeirCardProps>) => {
  const classes = styles();
  const [addWillModalVisible, setAddWillModalVisible] = useState(false);

  return (
    <div className={classes.container}>
      <div className={`${classes.text} ${classes.header}`}>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#101828' }}>
          {name}
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 14, color: '#475467' }}>{description}</span>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              type="link_color"
              text="Edit"
              buttonStyle={classes.button}
              onClick={() => {}}
            />
            <Button
              type="link_color"
              text="Delete"
              buttonStyle={classes.button}
              onClick={() => {}}
              destructive={true}
            />
          </div>
        </div>
      </div>

      <div className={classes.divider}></div>

      <div className={classes.heirDetailsContainer}>
        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Relationship</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{relationship}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Type</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{type}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>First Name</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{firstname}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Last Name</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{lastname}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Deceased</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{deceased ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Died in</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{diedIn}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Year of death</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{yearOfDeath}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Estate probated</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>
              {estateProbated ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Probate State</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{probateState ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Documents</span>
          </div>
          <div
            style={{
              width: '60%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {documents &&
              documents.map((e, i) => (
                <Tag
                  key={i}
                  text={e}
                  onClick={() => {}}
                  tagStyle={classes.tag}
                />
              ))}
          </div>
        </div>

        <div className={`${classes.text} ${classes.heirDetail}`}>
          <Button
            text="Add Will"
            buttonStyle={classes.willButton}
            onClick={() => setAddWillModalVisible(true)}
          />
        </div>
      </div>

      <AddWillModal
        visible={addWillModalVisible}
        onClose={() => setAddWillModalVisible(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    border: ['solid', 1, '#eaecf0'],
    boxShadow: '1px 1px 1px #eaecf0',
    width: 490,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontSize: 14,
    fontStretch: 'normal',
    textAlign: 'left',
  },

  header: {
    margin: 24,
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontWeight: 550,
    color: '#101828',
  },

  value: {
    color: '#475467',
  },

  divider: {
    borderBottom: ['solid', 1, '#eaecf0'],
  },

  button: {
    height: 20,
    width: 'max-content',
    fontSize: 14,
  },

  willButton: {
    height: 44,
    width: '100%',
    fontSize: 16,
  },

  heirDetailsContainer: {
    margin: '0px 17px',
    display: 'flex',
    flexDirection: 'column',
  },

  heirDetail: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    borderBottom: ['solid', 1, '#eaecf0'],
  },

  tag: {
    marginRight: 5,
  },
});
