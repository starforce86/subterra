import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Modal } from '../../../components/modal.component';
import { TextInput } from '../../../components/text-input.component';
import UploadIcon from '../../../assets/upload-cloud-01.svg';
import { CheckBoxInput } from '../../../components/check-box.component';

type CustomProps = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
};

export const AddMineralModal: React.FC<CustomProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const classes = styles();
  const [checklist, setChecklist] = useState({
    conveyanceCopy: {
      text: 'Conveyance Copy',
      value: false,
    },
    divisionOrder: {
      text: 'Division Order',
      value: false,
    },
    will: {
      text: 'Will',
      value: false,
    },
    probate: {
      text: 'Probate',
      value: false,
    },
    aoh: {
      text: 'AOH',
      value: false,
    },
    leaseCopy: {
      text: 'Lease Copy',
      value: false,
    },
    checkStub: {
      text: 'Check Stub / Royalty Payment',
      value: false,
    },
  });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Add Minerals"
      description="Helper description"
      icon="star-07.svg"
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: 20 }}>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Type of Mineral
            </span>
            <TextInput
              placeholder="Type of Mineral"
              inputStyle={classes.fieldInput}
              onTextChange={(value: string) => {}}
            />
          </div>
          <div>
            <span className={`${classes.textFont} ${classes.fieldLabel}`}>
              Percent Owned
            </span>
            <TextInput
              placeholder="Percent Owned"
              inputStyle={classes.fieldInput}
              onTextChange={(value: string) => {}}
            />
          </div>
        </div>

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

        <div className={classes.checkboxList}>
          <span
            className={`${classes.textFont} ${classes.uploadText}`}
            style={{ color: '#344054', fontWeight: 500 }}
          >
            Select Document Type
          </span>
          {(Object.keys(checklist) as (keyof typeof checklist)[]).map((e) => (
            <CheckBoxInput
              key={e}
              checked={checklist[e].value}
              onChange={() => {
                setChecklist({
                  ...checklist,
                  [e]: { ...checklist[e], value: !checklist[e].value },
                });
              }}
              inputStyle={classes.checkbox}
              text={checklist[e].text}
            />
          ))}
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
    width: 211,
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
    width: 170,
  },

  button: {
    width: 448,
    height: 44,
    marginTop: 10,
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

  checkboxList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 14,
  },

  checkbox: {
    marginTop: 14,
    color: '#344054',
    minWidth: 'max-content',
  },
});
