import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Dropdown } from '../../../components/dropdown.component';
import { TextInput } from '../../../components/text-input.component';
import { toast } from 'react-toastify';

type CustomProps = {
  onBack: Function;
  onContinue: Function;
  inputHandler: Function;
  data: Record<string, any>;
};

export const ContactInformationComponent: React.FC<CustomProps> = ({
  onBack,
  onContinue,
  inputHandler,
  data,
}) => {
  const classes = styles();
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

    if (!data.preferredContactMethod) errors.preferredContactMethod = true;
    if (!data.phone) errors.phone = true;
    if (!data.secondaryPhone) errors.secondaryPhone = true;
    if (!data.email) errors.email = true;
    if (!data.emergencyContactName) errors.emergencyContactName = true;
    if (!data.emergencyContactPhone) errors.emergencyContactPhone = true;
    if (!data.emergencyContactEmail) errors.emergencyContactEmail = true;

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Please check marked fields and correct your entries.');
      return;
    }

    return true;
  };

  return (
    <div className={classes.container}>
      <div className={classes.bodyContainer}>
        <span className={`${classes.text} ${classes.header}`}>
          Contact Information
        </span>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Preferred Contact Method*
              </span>
              <Dropdown
                options={[
                  { label: 'Phone', value: 'Phone' },
                  { label: 'Email', value: 'Email' },
                ]}
                selectedOption={data.preferredContactMethod}
                onChange={(value: string) =>
                  onInputChange({ preferredContactMethod: value })
                }
                placeholder="Contact Method"
                error={errors.preferredContactMethod}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Cell Phone*
              </span>
              <TextInput
                placeholder="Cell Phone"
                value={data.phone}
                error={errors.phone}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ phone: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Secondary Phone
              </span>
              <TextInput
                placeholder="Secondary Phone"
                value={data.secondaryPhone}
                error={errors.secondaryPhone}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ secondaryPhone: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Email*
              </span>
              <TextInput
                placeholder="Email"
                value={data.email}
                error={errors.email}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ email: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Emergency Contact Name*
              </span>
              <TextInput
                placeholder="Emergency Contact Name"
                value={data.emergencyContactName}
                error={errors.emergencyContactName}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ emergencyContactName: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Emergency Contact Phone*
              </span>
              <TextInput
                placeholder="Emergency Contact Phone"
                value={data.emergencyContactPhone}
                error={errors.emergencyContactPhone}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ emergencyContactPhone: value })
                }
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Emergency Contact Email
              </span>
              <TextInput
                placeholder="Emergency Contact Email"
                value={data.emergencyContactEmail}
                error={errors.emergencyContactEmail}
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  onInputChange({ emergencyContactEmail: value })
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
});
