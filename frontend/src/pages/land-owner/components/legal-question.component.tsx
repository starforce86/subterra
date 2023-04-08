import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { TextInput } from '../../../components/text-input.component';

export const LegalQuestionComponent: React.FC = () => {
  const classes = styles();
  const [data, setData] = useState({} as any);

  const inputHandler = (name: string, value: any) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>Legal Questions</span>
      </div>
      <div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Are you registering your rights for family member or yourself?
          </span>
          <TextInput
            placeholder="Myself"
            inputStyle={classes.fieldInput}
            value={data.registeringFor}
            onTextChange={(value: string) =>
              inputHandler('registeringFor', value)
            }
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Did you or someone inherit rights in a will?
          </span>
          <TextInput
            placeholder="Yes"
            inputStyle={classes.fieldInput}
            value={data.inheritRights}
            onTextChange={(value: string) =>
              inputHandler('inheritRights', value)
            }
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            If “Yes”, was it probated?
          </span>
          <TextInput
            placeholder="No"
            inputStyle={classes.fieldInput}
            value={data.probated}
            onTextChange={(value: string) => inputHandler('probated', value)}
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Attorney name
          </span>
          <TextInput
            placeholder="Robert Joseph"
            inputStyle={classes.fieldInput}
            value={data.attyName}
            onTextChange={(value: string) => inputHandler('attyName', value)}
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Attorney phone
          </span>
          <TextInput
            placeholder="+1 515-725-XXXX"
            inputStyle={classes.fieldInput}
            value={data.attyPhone}
            onTextChange={(value: string) => inputHandler('attyPhone', value)}
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Attorney email
          </span>
          <TextInput
            placeholder="robert@email.com"
            inputStyle={classes.fieldInput}
            value={data.attyEmail}
            onTextChange={(value: string) => inputHandler('attyEmail', value)}
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Attorney address
          </span>
          <TextInput
            placeholder="2250 S Ankeny Blvd, Ankeny, IA 50023"
            inputStyle={classes.fieldInput}
            value={data.attyAddress}
            onTextChange={(value: string) => inputHandler('attyAddress', value)}
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Number of Heirs
          </span>
          <TextInput
            placeholder="3"
            inputStyle={classes.fieldInput}
            value={data.numOfHeirs}
            onTextChange={(value: string) => inputHandler('numOfHeirs', value)}
          />
        </div>
        <div style={{ marginTop: 18 }}>
          <Button text="Edit" buttonStyle={classes.button} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    margin: 30,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  headerContainer: {
    marginBottom: 25,
  },

  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
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
    width: 370,
  },

  button: {
    width: 106,
    height: 44,
  },
});
