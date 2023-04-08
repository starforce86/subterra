import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { Dropdown } from '../../../components/dropdown.component';
import { Modal } from '../../../components/modal.component';
import { TextInput } from '../../../components/text-input.component';
import { HeirType } from './heir-list.component';

type CustomProps = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
};

export const AddHeirModal: React.FC<CustomProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const classes = styles();
  const [heir, setHeir] = useState({ type: 'Previous' } as any);

  const inputHandler = (name: string, value: any) => {
    setHeir({ ...heir, [name]: value });
  };

  const onTypeChange = (type: HeirType) => {
    setHeir({ type });
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Add Heir"
      description="Helper description"
      icon="user-plus-02.svg"
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.container} style={{ marginRight: 20 }}>
            <div>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Type
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={heir.type === 'Previous'}
                  onChange={() => onTypeChange('Previous')}
                  inputStyle={classes.checkbox}
                  text="Previous"
                />
                <CheckBoxInput
                  checked={heir.type === 'Potential'}
                  onChange={() => onTypeChange('Potential')}
                  inputStyle={classes.checkbox}
                  text="Potential"
                />
              </div>
            </div>
            {heir.type === 'Previous' && (
              <>
                <div style={{ marginTop: 22 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    First Name
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('firstname', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Deceased
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <CheckBoxInput
                      checked={heir.deceased === true}
                      onChange={() => inputHandler('deceased', true)}
                      inputStyle={classes.checkbox}
                      text="Yes"
                    />
                    <CheckBoxInput
                      checked={heir.deceased === false}
                      onChange={() => inputHandler('deceased', false)}
                      inputStyle={classes.checkbox}
                      text="No"
                    />
                  </div>
                </div>
                <div style={{ marginTop: 22 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Died in State / City / County
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) => inputHandler('diedIn', value)}
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Estate probated
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <CheckBoxInput
                      checked={heir.estateProbated === true}
                      onChange={() => inputHandler('estateProbated', true)}
                      inputStyle={classes.checkbox}
                      text="Yes"
                    />
                    <CheckBoxInput
                      checked={heir.estateProbated === false}
                      onChange={() => inputHandler('estateProbated', false)}
                      inputStyle={classes.checkbox}
                      text="No"
                    />
                  </div>
                </div>
                <div style={{ marginTop: 22 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Probate State / City / County
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('probateState', value)
                    }
                  />
                </div>
              </>
            )}
            {heir.type === 'Potential' && (
              <>
                <div style={{ marginTop: 22 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Relationship
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('relationship', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 22 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    First Name
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('firstname', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Included in will
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <CheckBoxInput
                      checked={heir.deceased === true}
                      onChange={() => inputHandler('includedInWill', true)}
                      inputStyle={classes.checkbox}
                      text="Yes"
                    />
                    <CheckBoxInput
                      checked={heir.deceased === false}
                      onChange={() => inputHandler('includedInWill', false)}
                      inputStyle={classes.checkbox}
                      text="No"
                    />
                  </div>
                </div>
                <div style={{ marginTop: 22 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Street Address
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('streetAddress', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    State
                  </span>
                  <Dropdown
                    options={[
                      { label: 'California', value: 'California' },
                      { label: 'Kansas', value: 'Kansas' },
                      { label: 'Michigan', value: 'Michigan' },
                      { label: 'New Jersey', value: 'New Jersey' },
                    ]}
                    selectedOption={{ label: heir.state, value: heir.state }}
                    onChange={(value: any) =>
                      inputHandler('state', value.value)
                    }
                    placeholder="State"
                  />
                </div>
              </>
            )}
          </div>
          <div className={classes.container}>
            {heir.type === 'Previous' && (
              <>
                <div>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Relationship
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('relationship', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Last Name
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('lastname', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 94 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Year of death or range of years
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('yearOfDeath', value)
                    }
                  />
                </div>
              </>
            )}
            {heir.type === 'Potential' && (
              <>
                <div style={{ marginTop: 82 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Age
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) => inputHandler('age', value)}
                  />
                </div>
                <div style={{ marginTop: 23 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Last Name
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('lastname', value)
                    }
                  />
                </div>
                <div style={{ marginTop: 94 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    City
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) => inputHandler('city', value)}
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                    Zip Code
                  </span>
                  <TextInput
                    placeholder="Value"
                    inputStyle={classes.fieldInput}
                    onTextChange={(value: any) =>
                      inputHandler('zipCode', value)
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginTop: 12 }}>
            <Button
              text="Add"
              buttonStyle={classes.button}
              onClick={() => onSubmit()}
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

  checkbox: {
    marginTop: 14,
    marginRight: 20,
    color: '#344054',
    minWidth: 'max-content',
  },
});
