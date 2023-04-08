import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Modal } from '../../../components/modal.component';
import UploadIcon from '../../../assets/upload-cloud-01.svg';
import { TextInput } from '../../../components/text-input.component';
import { TextAreaInput } from '../../../components/text-area.component';
import { Dropdown } from '../../../components/dropdown.component';

type CustomProps = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
};

export const AddWillModal: React.FC<CustomProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const classes = styles();
  const [will, setWill] = useState({ type: 'Previous' } as any);

  const inputHandler = (name: string, value: any) => {
    setWill({ ...will, [name]: value });
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Add Will"
      description="Helper description"
      icon="file-06.svg"
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.container}>
          <div className={classes.uploadBox}>
            <img src={UploadIcon} className={classes.uploadIcon} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                type="link_color"
                text="Upload Document"
                buttonStyle={classes.uploadButton}
                onClick={() => {}}
              />
              <span className={`${classes.textFont} ${classes.uploadText}`}>
                or drag and drop
              </span>
            </div>
            <span
              className={`${classes.textFont} ${classes.uploadText}`}
              style={{ fontSize: 12 }}
            >
              Type of docs, etc.
            </span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Description
            </span>
            <TextAreaInput
              placeholder="Value"
              inputStyle={classes.input}
              value={will.description}
              onTextChange={(value: string) =>
                inputHandler('description', value)
              }
            />
          </div>
          <div>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Location of will
            </span>
            <TextInput
              placeholder="Value"
              value={will.locationOfWill}
              inputStyle={classes.fieldInput}
              onTextChange={(value: any) =>
                inputHandler('locationOfWill', value)
              }
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Location of will contact phone
            </span>
            <TextInput
              placeholder="Value"
              value={will.locationOfWillContactPhone}
              inputStyle={classes.fieldInput}
              onTextChange={(value: any) =>
                inputHandler('locationOfWillContactPhone', value)
              }
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Heir&apos;s covered by the document
            </span>
            <Dropdown
              options={[]}
              selectedOption={{ label: '', value: '' }}
              onChange={(value: any) => {}}
              placeholder="Value"
            />
          </div>
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
    width: 360,
    height: 44,
  },

  input: {
    width: 320,
  },

  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eaecf0',
    padding: '16px 0px',
  },

  uploadIcon: {
    height: 40,
    width: 40,
    marginBottom: 10,
  },

  uploadButton: {
    width: 122,
    fontSize: 14,
  },

  uploadText: {
    fontSize: 14,
    color: '#475467',
  },
});
