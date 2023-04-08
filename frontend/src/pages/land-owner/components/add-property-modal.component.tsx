import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Dropdown } from '../../../components/dropdown.component';
import { Modal } from '../../../components/modal.component';
import { TextAreaInput } from '../../../components/text-area.component';
import { TextInput } from '../../../components/text-input.component';
import {
  getCities,
  getCounty,
  getMineralTypes,
  getState,
} from '../../../services/statics.action';
import { toast } from 'react-toastify';

type CustomProps = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
  data: Record<string, any>;
};

export const AddPropertyModal: React.FC<CustomProps> = ({
  visible,
  onClose,
  onSubmit,
  data,
}) => {
  const classes = styles();
  const [state, setState] = useState([] as any[]);
  const [county, setCounty] = useState([] as any[]);
  const [cities, setCity] = useState([] as any[]);
  const [errors, setErrors] = useState({} as any);
  const [property, setProperty] = useState({} as any);
  const [minerals, setMinerals] = useState([] as any[]);

  const onAdd = () => {
    if (validated()) onSubmit(property);
  };

  const validated = () => {
    const errors: any = {};

    if (!property.alias) errors.alias = true;
    if (!property.propertyAddress) errors.propertyAddress = true;
    if (!property.state) errors.state = true;
    if (!property.county) errors.county = true;
    if (!property.legalDescription) errors.legalDescription = true;
    if (!property.city) errors.city = true;
    if (!property.zipCode) errors.zipCode = true;
    if (!property.comments) errors.comments = true;
    if (!property.minerals) errors.minerals = true;

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Please check marked fields and correct your entries.');
      return;
    }

    return true;
  };

  const getCountyList = async (stateId: string) => {
    const res = await getCounty(stateId);
    return res.data.results.map((e: any) => {
      return {
        value: e.id,
        label: e.name,
      };
    });
  };

  const getCityList = async (countyId: string) => {
    const res = await getCities(countyId);
    return res.data.results.map((e: any) => {
      return {
        value: e.id,
        label: e.name,
      };
    });
  };

  useEffect(() => {
    getState().then((res: any) => {
      setState(
        res.data.results.map((e: any) => {
          return {
            value: e.id,
            label: e.name,
          };
        }),
      );
    });
    getMineralTypes().then((res: any) => {
      setMinerals(
        res.data.results.map((e: any) => {
          return {
            value: e.id,
            label: e.title,
          };
        }),
      );
    });
  }, []);

  useEffect(() => {
    if (visible) {
      if (data) {
        getState().then((res: any) => {
          setState(
            res.data.results.map((e: any) => {
              return {
                value: e.id,
                label: e.name,
              };
            }),
          );
        });
        getCountyList(data.state).then((data) => setCounty(data));
        getCityList(data.county).then((data) => setCity(data));

        setProperty({
          ...data,
          state: { label: data.stateName, value: data.state },
          county: { label: data.countyName, value: data.county },
          city: { label: data.propertyCityName, value: data.propertyCity },
          zipCode: data.propertyZipcode,
          minerals: data.minerals,
        });
      } else {
        setProperty({});
      }
    } else {
      setProperty({});
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={`${data ? 'Update' : 'Add'} Property?`}
      description="Helper description"
      icon="building-06.svg"
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.container} style={{ marginRight: 20 }}>
            <div>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Property Alias
              </span>
              <TextInput
                placeholder="Property Alias"
                value={property.alias}
                error={errors.alias}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  setProperty({ ...property, alias: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Property Address
              </span>
              <TextInput
                placeholder="Property Address"
                value={property.propertyAddress}
                error={errors.propertyAddress}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  setProperty({ ...property, propertyAddress: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                State
              </span>
              <Dropdown
                options={state}
                selectedOption={property.state}
                onChange={(value: any) => {
                  setProperty({
                    ...property,
                    state: value,
                    county: null,
                    city: null,
                  });
                  getCountyList(value.value).then((data) => setCounty(data));
                  setCity([]);
                }}
                placeholder="State"
                error={errors.state}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                County
              </span>
              <Dropdown
                options={county}
                selectedOption={property.county}
                onChange={(value: any) => {
                  setProperty({ ...property, county: value, city: null });
                  getCityList(value.value).then((data) => setCity(data));
                }}
                placeholder="County"
                error={errors.county}
              />
            </div>
          </div>
          <div className={classes.container}>
            <div>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Legal Description
              </span>
              <TextInput
                placeholder="Legal Description"
                value={property.legalDescription}
                error={errors.legalDescription}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  setProperty({ ...property, legalDescription: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Minerals
              </span>
              <Dropdown
                options={minerals}
                selectedOption={property.minerals}
                onChange={(value: any) =>
                  setProperty({ ...property, minerals: value })
                }
                placeholder="Mineral Type"
                error={errors.minerals}
                isMulti={true}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                City
              </span>
              <Dropdown
                options={cities}
                selectedOption={property.city}
                onChange={(value: any) =>
                  setProperty({ ...property, city: value })
                }
                placeholder="City"
                error={errors.city}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Zip Code
              </span>
              <TextInput
                placeholder="Zip Code"
                value={property.zipCode}
                error={errors.zipCode}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  setProperty({ ...property, zipCode: value })
                }
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginTop: 12 }}>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Comments
            </span>
            <TextAreaInput
              placeholder="Comments"
              value={property.comments}
              error={errors.comments}
              inputStyle={classes.input}
              onTextChange={(value: string) =>
                setProperty({ ...property, comments: value })
              }
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <Button
              text={data ? 'Save' : 'Add'}
              buttonStyle={classes.button}
              onClick={() => onAdd()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },

  textFont: {
    fontFamily: 'Inter',
    fontStretch: 'normal',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    color: '#000',
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#344054',
    lineHeight: 2,
  },

  fieldInput: {
    width: 320,
  },

  button: {
    width: 740,
    height: 44,
  },

  input: {
    width: 700,
  },
});
