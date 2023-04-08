import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { Modal } from '../../../components/modal.component';
import { TextAreaInput } from '../../../components/text-area.component';

type CustomProps = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
  inquiryId: string;
};

export const InquiryDeclineModal: React.FC<CustomProps> = ({
  visible,
  onClose,
  onSubmit,
  inquiryId,
}) => {
  const classes = styles();
  const [options, setOptions] = useState([] as any[]);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setOptions([
      {
        id: 'option1',
        name: 'Too small of a project',
      },
      {
        id: 'option2',
        name: 'Too large of a project',
      },
      {
        id: 'option3',
        name: 'Too busy with current project / Not enough bandwidth',
      },
      {
        id: 'option4',
        name: 'Not working in this area anymore',
      },
      {
        id: 'option5',
        name: 'Do not feel can fulfill customers desired outcome',
      },
      {
        id: 'option6',
        name: 'Other',
      },
    ]);
  }, []);
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="You declined this inquiry"
      description="Reason relevant copy"
      icon="annotation-alert.svg"
    >
      <>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {options.map((e: any) => (
            <CheckBoxInput
              key={e.id}
              checked={e.id === reason}
              onChange={() => setReason(e.id)}
              inputStyle={classes.checkbox}
              text={e.name}
            />
          ))}
        </div>
        {reason === 'option6' && (
          <div style={{ marginTop: 10 }}>
            <TextAreaInput
              placeholder="Details"
              inputStyle={classes.input}
              value={message}
              onTextChange={(value: string) => setMessage(value)}
            />
          </div>
        )}
        <div
          style={{
            marginTop: 20,
            width: 352,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="secondary_gray"
            text="Cancel"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
          <Button
            text="Confirm"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
        </div>
      </>
    </Modal>
  );
};

const styles = createUseStyles({
  headerDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  headerTitle: {
    fontSize: 18,
    letterSpacing: 'normal',
    fontWeight: 600,
    fontFamily: 'Inter',
    color: '#101828',
  },

  headerDescription: {
    fontSize: 14,
    letterSpacing: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Inter',
    color: '#475467',
  },
  checkbox: {
    color: '#344054',
    minWidth: 'max-content',
    lineHeight: 1.5,
    fontWeight: 500,
  },

  input: {
    width: 310,
  },

  button: {
    width: 170,
    height: 44,
  },
});
