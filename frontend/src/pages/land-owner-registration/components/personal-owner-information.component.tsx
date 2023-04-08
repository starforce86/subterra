import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Dropdown } from '../../../components/dropdown.component';
import { TextInput } from '../../../components/text-input.component';
import {
  getCities,
  getCounty,
  getState,
} from '../../../services/statics.action';
import { toast } from 'react-toastify';

type CustomProps = {
  onBack: Function;
  onContinue: Function;
  inputHandler: Function;
  data: Record<string, any>;
};

export const PersonalOwnerInformationComponent: React.FC<CustomProps> = ({
  onBack,
  onContinue,
  inputHandler,
  data,
}) => {
  const classes = styles();
  const [state, setState] = useState([] as any[]);
  const [county, setCounty] = useState([] as any[]);
  const [cities, setCity] = useState([] as any[]);
  const [mcounty, setMCounty] = useState([] as any[]);
  const [mcities, setMCity] = useState([] as any[]);
  const [errors, setErrors] = useState({} as any);

  const onInputChange = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((e: string) => delete errors[e]);
    inputHandler(obj);
  };

  const onSubmit = () => {
    if (validated()) onContinue();
  };

  const validated = () => {
    const errors: any = {};

    if (!data.firstName) errors.firstName = true;
    if (!data.lastName) errors.lastName = true;
    if (!data.category) errors.category = true;
    if (!data.physicalAddress) errors.physicalAddress = true;
    if (!data.city) errors.city = true;
    if (!data.state) errors.state = true;
    if (!data.county) errors.county = true;
    if (!data.zipCode) errors.zipCode = true;
    if (!data.password1) errors.password1 = true;
    if (!data.password2 || data.password1 !== data.password2)
      errors.password2 = true;

    if (
      data.mailingAddress ||
      data.mailingCity ||
      data.mailingState ||
      data.mailingCounty ||
      data.mailingZipCode
    ) {
      if (!data.mailingAddress) errors.mailingAddress = true;
      if (!data.mailingCity) errors.mailingCity = true;
      if (!data.mailingState) errors.mailingState = true;
      if (!data.mailingCounty) errors.mailingCounty = true;
      if (!data.mailingZipCode) errors.mailingZipCode = true;
    }

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
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.bodyContainer}>
        <span className={`${classes.text} ${classes.header}`}>
          Personal Owner Information
        </span>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                First Name*
              </span>
              <TextInput
                placeholder="First Name"
                value={data.firstName}
                error={errors.firstName}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ firstName: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Middle Name
              </span>
              <TextInput
                placeholder="Middle Name"
                value={data.middleName}
                error={errors.middleName}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ middleName: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Last Name*
              </span>
              <TextInput
                placeholder="Last Name"
                value={data.lastName}
                error={errors.lastName}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ lastName: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Maiden Name
              </span>
              <TextInput
                placeholder="Maiden Name"
                value={data.maidenName}
                error={errors.maidenName}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ maidenName: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                AKA (also known as)
              </span>
              <TextInput
                placeholder="AKA (also known as)"
                value={data.aka}
                error={errors.aka}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) => onInputChange({ aka: value })}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                2.4.6. Trust / LLC / Legal Entity
              </span>
              <Dropdown
                options={[
                  { value: 'Trust', label: 'Trust' },
                  { value: 'LLC', label: 'LLC' },
                  { value: 'Legal Entity', label: 'Legal Entity' },
                ]}
                selectedOption={data.category}
                onChange={(value: any) => onInputChange({ category: value })}
                placeholder="Category"
                error={errors.category}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Physical Street Address*
              </span>
              <TextInput
                placeholder="Physical Street Address"
                value={data.physicalAddress}
                error={errors.physicalAddress}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ physicalAddress: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <form>
                <span className={`${classes.text} ${classes.fieldLabel}`}>
                  Password
                </span>
                <TextInput
                  placeholder="Password"
                  inputStyle={classes.passInput}
                  type="password"
                  onTextChange={(value: string) =>
                    onInputChange({ password1: value })
                  }
                  error={errors.password1}
                />
              </form>
            </div>
            <div style={{ marginTop: 12 }}>
              <form>
                <span className={`${classes.text} ${classes.fieldLabel}`}>
                  Confirm Password
                </span>
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  inputStyle={classes.passInput}
                  onTextChange={(value: string) =>
                    onInputChange({ password2: value })
                  }
                  error={errors.password2}
                />
              </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                text="Continue"
                buttonStyle={classes.button}
                onClick={() => onSubmit()}
              />
              <Button
                type="secondary_color"
                text="Back"
                buttonStyle={classes.button}
                onClick={() => onBack()}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                City*
              </span>
              <Dropdown
                options={cities}
                selectedOption={data.city}
                onChange={(value: any) => onInputChange({ city: value })}
                placeholder="City"
                error={errors.city}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                State
              </span>
              <Dropdown
                options={state}
                selectedOption={data.state}
                onChange={(value: any) => {
                  onInputChange({ state: value, county: null, city: null });
                  getCountyList(value.value).then((data) => setCounty(data));
                  setCity([]);
                }}
                placeholder="State"
                error={errors.state}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                County
              </span>
              <Dropdown
                options={county}
                selectedOption={data.county}
                onChange={(value: any) => {
                  onInputChange({ county: value, city: null });
                  getCityList(value.value).then((data) => setCity(data));
                }}
                placeholder="County"
                error={errors.county}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Zip Code
              </span>
              <TextInput
                placeholder="Zip Code"
                value={data.zipCode}
                error={errors.zipCode}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ zipCode: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Mailing Street Address (if different)
              </span>
              <TextInput
                placeholder="Mailing Street Address (if different)"
                value={data.mailingAddress}
                error={errors.mailingAddress}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ mailingAddress: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                City
              </span>
              <Dropdown
                options={mcities}
                selectedOption={data.mailingCity}
                onChange={(value: any) => onInputChange({ mailingCity: value })}
                placeholder="City"
                error={errors.mailingCity}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                State
              </span>
              <Dropdown
                options={state}
                selectedOption={data.mailingState}
                onChange={(value: any) => {
                  onInputChange({
                    mailingState: value,
                    mailingCounty: null,
                    mailingCity: null,
                  });
                  getCountyList(value.value).then((data) => setMCounty(data));
                  setMCity([]);
                }}
                placeholder="State"
                error={errors.mailingState}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                County
              </span>
              <Dropdown
                options={mcounty}
                selectedOption={data.mailingCounty}
                onChange={(value: any) => {
                  onInputChange({ mailingCounty: value, mailingCity: null });
                  getCityList(value.value).then((data) => setMCity(data));
                }}
                placeholder="County"
                error={errors.mailingCounty}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Zip Code
              </span>
              <TextInput
                placeholder="Zip Code"
                value={data.mailingZipCode}
                error={errors.mailingZipCode}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ mailingZipCode: value })
                }
              />
            </div>
          </div>
        </div>
      </div>
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
    maxWidth: 730,
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
    color: '#000000',
    lineHeight: 2,
  },

  fieldInput: {
    width: 370,
  },

  button: {
    height: 41,
    width: 125,
    fontSize: 16,
    marginBottom: 10,
    marginRight: 25,
    marginTop: 20,
  },

  passInput: {
    width: 350,
  },
});
