import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Tag } from '../../../components/tag.component';
import { Property } from './property-list.component';

interface PropertyCardProps extends Property {
  onEdit: Function;
  onDelete: Function;
}

export const PropertyCardComponent: React.FC<PropertyCardProps> = ({
  id,
  name,
  description,
  alias,
  legalDescription,
  address,
  state,
  county,
  minerals,
  comments,
  documents,
  activities,
  onEdit,
  onDelete,
}: PropertyCardProps) => {
  const classes = styles();

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
              onClick={() => onEdit(id)}
            />
            <Button
              type="link_color"
              text="Delete"
              buttonStyle={classes.button}
              onClick={() => onDelete(id)}
              destructive={true}
            />
          </div>
        </div>
      </div>

      <div className={classes.divider}></div>

      <div className={classes.propertyDetailsContainer}>
        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Property Alias</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{alias}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Legal Description</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{legalDescription}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Address</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{address}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>State</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{state.label}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>County</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{county.label}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Minerals</span>
          </div>
          <div
            style={{
              width: '60%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {minerals.map((e, i) => (
              <Tag key={i} text={e} onClick={() => {}} tagStyle={classes.tag} />
            ))}
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Comments</span>
          </div>
          <div style={{ width: '60%' }}>
            <span className={classes.value}>{comments}</span>
          </div>
        </div>

        <div className={`${classes.text} ${classes.propertyDetail}`}>
          <div style={{ width: '40%' }}>
            <span className={classes.label}>Documents</span>
          </div>
          <div
            style={{ width: '60%', display: 'flex', flexDirection: 'column' }}
          >
            {documents.map((e, i) => (
              <span key={i} className={classes.value}>
                {e}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`${classes.text} ${classes.propertyDetail}`}
          style={{ backgroundColor: '#eaecf0' }}
        >
          <div style={{ width: '100%' }}>
            <span className={classes.label} style={{ fontWeight: 600 }}>
              Activity
            </span>
          </div>
        </div>

        {activities.length === 0 && <div style={{ marginBottom: 12 }}></div>}

        {activities.map((e, i) => (
          <div key={i} className={`${classes.text} ${classes.propertyDetail}`}>
            <div style={{ width: '40%' }}>
              <span className={classes.label}>{e.serviceCompanyName}</span>
            </div>
            <div style={{ width: '60%' }}>
              <span className={classes.value}>{e.activity}</span>
            </div>
          </div>
        ))}
      </div>
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

  propertyDetailsContainer: {
    margin: '0px 17px',
    display: 'flex',
    flexDirection: 'column',
  },

  propertyDetail: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    borderBottom: ['solid', 1, '#eaecf0'],
  },

  tag: {
    marginRight: 5,
  },
});
