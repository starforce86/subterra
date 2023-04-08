import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { toast } from 'react-toastify';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { Dropdown } from '../../../components/dropdown.component';
import { TextInput } from '../../../components/text-input.component';
import {
  getCounty,
  getState,
  getCities,
} from '../../../services/statics.action';

type CustomProps = {
  onBack: Function;
  onContinue: Function;
  inputHandler: Function;
  data: Record<string, any>;
};

export const LegalInformationComponent: React.FC<CustomProps> = ({
  onBack,
  onContinue,
  inputHandler,
  data,
}) => {
  const classes = styles();
  const [state, setState] = useState([] as any[]);
  const [county, setCounty] = useState([] as any[]);
  const [cities, setCity] = useState([] as any[]);
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

    // if (data.hasAttorney === 'Yes') {}
    if (!data.attorneyFirstname) errors.attorneyFirstname = true;
    if (!data.attorneyLastname) errors.attorneyLastname = true;
    if (!data.attorneyCompanyname) errors.attorneyCompanyname = true;
    if (!data.attorneyStreet) errors.attorneyStreet = true;
    if (!data.attorneyState) errors.attorneyState = true;
    if (!data.attorneyCounty) errors.attorneyCounty = true;
    if (!data.attorneyZipCode) errors.attorneyZipCode = true;

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
    if (!data.rightsFor)
      onInputChange({
        isRightsProbated: 'Yes',
        isRightsInheritInAWill: 'Yes',
        hasAttorney: 'Yes',
        rightsFor: 'Self',
      });

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
          Legal Questions
        </span>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12, width: 420 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Are you registering your rights for family member or yourself?*
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={data.rightsFor === 'Self'}
                  onChange={() => inputHandler({ rightsFor: 'Self' })}
                  inputStyle={classes.checkbox}
                  text="Self"
                />
                <CheckBoxInput
                  checked={data.rightsFor === 'Other'}
                  onChange={() => inputHandler({ rightsFor: 'Other' })}
                  inputStyle={classes.checkbox}
                  text="Other"
                />
                <CheckBoxInput
                  checked={data.rightsFor === 'Both'}
                  onChange={() => inputHandler({ rightsFor: 'Both' })}
                  inputStyle={classes.checkbox}
                  text="Both"
                />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Do you currently have an attorney for your estate?*
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={data.hasAttorney === 'Yes'}
                  onChange={() => inputHandler({ hasAttorney: 'Yes' })}
                  inputStyle={classes.checkbox}
                  text="Yes"
                />
                <CheckBoxInput
                  checked={data.hasAttorney === 'No'}
                  onChange={() => inputHandler({ hasAttorney: 'No' })}
                  inputStyle={classes.checkbox}
                  text="No"
                />
                <CheckBoxInput
                  checked={data.hasAttorney === 'Not Sure'}
                  onChange={() => inputHandler({ hasAttorney: 'Not Sure' })}
                  inputStyle={classes.checkbox}
                  text="Not Sure"
                />
              </div>
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12, width: 420 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Did you or someone inherit rights in a will?*
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={data.isRightsInheritInAWill === 'Yes'}
                  onChange={() =>
                    inputHandler({ isRightsInheritInAWill: 'Yes' })
                  }
                  inputStyle={classes.checkbox}
                  text="Yes"
                />
                <CheckBoxInput
                  checked={data.isRightsInheritInAWill === 'No'}
                  onChange={() =>
                    inputHandler({ isRightsInheritInAWill: 'No' })
                  }
                  inputStyle={classes.checkbox}
                  text="No"
                />
                <CheckBoxInput
                  checked={data.isRightsInheritInAWill === 'Not Sure'}
                  onChange={() =>
                    inputHandler({ isRightsInheritInAWill: 'Not Sure}' })
                  }
                  inputStyle={classes.checkbox}
                  text="Not Sure"
                />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                If “Yes”, was it probated?*
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={data.isRightsProbated === 'Yes'}
                  onChange={() => inputHandler({ isRightsProbated: 'Yes' })}
                  inputStyle={classes.checkbox}
                  text="Yes"
                />
                <CheckBoxInput
                  checked={data.isRightsProbated === 'No'}
                  onChange={() => inputHandler({ isRightsProbated: 'No' })}
                  inputStyle={classes.checkbox}
                  text="No"
                />
                <CheckBoxInput
                  checked={data.isRightsProbated === 'Not Sure'}
                  onChange={() =>
                    inputHandler({ isRightsProbated: 'Not Sure' })
                  }
                  inputStyle={classes.checkbox}
                  text="Not Sure"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 33 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            If “Yes”, enter attorney info
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                First Name
              </span>
              <TextInput
                placeholder="First Name"
                value={data.attorneyFirstname}
                error={errors.attorneyFirstname}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ attorneyFirstname: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Last Name
              </span>
              <TextInput
                placeholder="Last Name"
                value={data.attorneyLastname}
                error={errors.attorneyLastname}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ attorneyLastname: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Company Name
              </span>
              <TextInput
                placeholder="Company Name"
                value={data.attorneyCompanyname}
                error={errors.attorneyCompanyname}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ attorneyCompanyname: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Street Address
              </span>
              <TextInput
                placeholder="Street Address"
                value={data.attorneyStreet}
                error={errors.attorneyStreet}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ attorneyStreet: value })
                }
              />
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
                State
              </span>
              <Dropdown
                options={state}
                selectedOption={data.attorneyState}
                onChange={(value: any) => {
                  onInputChange({
                    attorneyState: value,
                    attorneyCounty: null,
                    attorneyCity: null,
                  });
                  getCountyList(value.value).then((data) => setCounty(data));
                }}
                placeholder="State"
                error={errors.attorneyState}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                County
              </span>
              <Dropdown
                options={county}
                selectedOption={data.attorneyCounty}
                onChange={(value: any) => {
                  getCityList(value.value).then((list) => setCity(list));
                  onInputChange({ attorneyCounty: value, attorneyCity: null });
                }}
                placeholder="County"
                error={errors.attorneyCounty}
              />
            </div>
            <div id="dd-cities" style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                City
              </span>
              <Dropdown
                options={cities}
                selectedOption={data.attorneyCity}
                onChange={(value: any) =>
                  onInputChange({ attorneyCity: value })
                }
                placeholder="City"
                error={errors.attorneyCity}
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Zip Code
              </span>
              <TextInput
                placeholder="Zip Code"
                value={data.attorneyZipCode}
                error={errors.attorneyZipCode}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ attorneyZipCode: value })
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
});
