import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { Table } from '../../../components/table.component';
import { TextInput } from '../../../components/text-input.component';
import { AddPropertyModal } from './add-property-modal.component';
import { toast } from 'react-toastify';

type CustomProps = {
  onBack: Function;
  onSubmit: Function;
  inputHandler: Function;
  data: Record<string, any>;
};

type PropertyItem = {
  alias: string;
  legalDescription: string;
  comments: string;
  state: string;
  county: string;
  stateName: string;
  countyName: string;
  propertyAddress: string;
  propertyCity: string;
  propertyCityName: string;
  propertyState: string;
  propertyZipcode: string;
};

export const PropertyMineralInformationComponent: React.FC<CustomProps> = ({
  onBack,
  onSubmit,
  inputHandler,
  data,
}) => {
  const classes = styles();
  const [properties, setProperties] = useState(
    data.properties ?? ([] as PropertyItem[]),
  );
  const [addPropertyVisible, setAddPropertyVisible] = useState(false);
  const [errors, setErrors] = useState({} as any);
  const [selectedData, setSelectedData] = useState(null as any);

  const onInputChange = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((e: string) => delete errors[e]);
    inputHandler(obj);
  };

  const beforeSubmit = () => {
    if (validated()) {
      onInputChange({ properties });
      onSubmit();
    }
  };

  const validated = () => {
    const errors: any = {};

    if (data.numberOfProperties === undefined || data.numberOfProperties === '')
      errors.numberOfProperties = true;

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Please check marked fields and correct your entries.');
      return;
    }

    return true;
  };

  const addProperty = (propertyObj: any) => {
    setSelectedData(null);
    if (propertyObj.id !== undefined) {
      properties[propertyObj.id] = {
        alias: propertyObj.alias,
        legalDescription: propertyObj.legalDescription,
        comments: propertyObj.comments,
        state: propertyObj.state.value,
        county: propertyObj.county.value,
        stateName: propertyObj.state.label,
        countyName: propertyObj.county.label,
        minerals: propertyObj.minerals,
        propertyAddress: propertyObj.propertyAddress,
        propertyCity: propertyObj.city.value,
        propertyCityName: propertyObj.city.label,
        propertyState: propertyObj.state.value,
        propertyZipcode: propertyObj.zipCode,
      };
      setProperties([...properties]);
    } else {
      setProperties([
        ...properties,
        ...[
          {
            alias: propertyObj.alias,
            legalDescription: propertyObj.legalDescription,
            comments: propertyObj.comments,
            state: propertyObj.state.value,
            county: propertyObj.county.value,
            stateName: propertyObj.state.label,
            countyName: propertyObj.county.label,
            minerals: propertyObj.minerals,
            propertyAddress: propertyObj.propertyAddress,
            propertyCity: propertyObj.city.value,
            propertyCityName: propertyObj.city.label,
            propertyState: propertyObj.state.value,
            propertyZipcode: propertyObj.zipCode,
          },
        ],
      ]);
    }
    setAddPropertyVisible(false);
  };

  const propertiesColumn = [
    {
      name: 'State',
      selector: (row: Record<string, any>) => row.stateName,
    },
    {
      name: 'County',
      selector: (row: Record<string, any>) => row.countyName,
    },
    {
      name: 'Property Alias',
      selector: (row: Record<string, any>) => row.alias,
    },
    {
      name: 'Legal Description',
      selector: (row: Record<string, any>) => row.legalDescription,
    },
    {
      name: 'Property Address',
      selector: (row: Record<string, any>) => row.propertyAddress,
    },
    {
      name: 'Comments',
      selector: (row: Record<string, any>) => row.comments,
    },
    {
      name: 'Actions',
      selector: (row: Record<string, any>, index: number) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            type="link_gray"
            iconLeading="trash-01.svg"
            text=""
            buttonStyle={classes.actionIcon}
            onClick={() => {
              properties.splice(index, 1);
              setProperties([...properties]);
            }}
          />
          <Button
            type="link_gray"
            iconLeading="edit-03.svg"
            text=""
            buttonStyle={classes.actionIcon}
            onClick={() => {
              setSelectedData({ id: index, ...properties[index] });
              setAddPropertyVisible(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!data.ownershipType) onInputChange({ ownershipType: 'Purchased' });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.bodyContainer}>
        <span className={`${classes.text} ${classes.header}`}>
          Add Property
        </span>

        <div className={classes.fieldContainer}>
          <div style={{ marginTop: 12 }}>
            <span className={`${classes.text} ${classes.fieldLabel}`}>
              How many properties do you own?*
            </span>
            <TextInput
              placeholder="How many properties do you own?"
              value={data.numberOfProperties}
              error={errors.numberOfProperties}
              inputStyle={classes.fieldInput}
              onTextChange={(value: string) =>
                onInputChange({ numberOfProperties: value })
              }
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <span className={`${classes.text} ${classes.fieldLabel}`}>
              How did you come into ownership?*
            </span>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <CheckBoxInput
                checked={data.ownershipType === 'Purchased'}
                onChange={() => onInputChange({ ownershipType: 'Purchased' })}
                inputStyle={classes.checkbox}
                text="Purchased"
              />
              <CheckBoxInput
                checked={data.ownershipType === 'Inherited'}
                onChange={() => onInputChange({ ownershipType: 'Inherited' })}
                inputStyle={classes.checkbox}
                text="Inherited"
              />
              <CheckBoxInput
                checked={data.ownershipType === 'Not Sure'}
                onChange={() => onInputChange({ ownershipType: 'Not Sure' })}
                inputStyle={classes.checkbox}
                text="Not Sure"
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 33 }}>
          <div style={{ marginBottom: 35 }}>
            <Table
              columns={propertiesColumn}
              data={properties}
              title="Property List"
              onAdd={() => setAddPropertyVisible(true)}
              addText="Add Property"
            />
          </div>
        </div>

        <div className={classes.fieldContainer}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              text="Submit"
              buttonStyle={classes.button}
              onClick={() => beforeSubmit()}
            />
            <Button
              type="secondary_color"
              text="Back"
              buttonStyle={classes.button}
              onClick={() => onBack()}
            />
          </div>
        </div>
      </div>
      <AddPropertyModal
        visible={addPropertyVisible}
        onClose={() => {
          setSelectedData(null);
          setAddPropertyVisible(false);
        }}
        onSubmit={(propertyObj: any) => addProperty(propertyObj)}
        data={selectedData}
      />
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  bodyContainer: {
    margin: '0px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  header: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 600,
    color: '#000',
  },

  subheader: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000',
  },

  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    marginRight: 30,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    color: '#344054',
    lineHeight: 2,
  },

  fieldInput: {
    width: 370,
  },

  checkbox: {
    marginTop: 14,
    marginRight: 20,
    color: '#344054',
    minWidth: 'max-content',
  },

  button: {
    height: 41,
    width: 125,
    fontSize: 16,
    marginBottom: 10,
    marginRight: 25,
    marginTop: 20,
  },

  actionIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
});
