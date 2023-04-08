import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Modal } from '../../../components/modal.component';
import { TextAreaInput } from '../../../components/text-area.component';
import { TextInput } from '../../../components/text-input.component';

type CustomProps = {
  visible: boolean;
  onClose: Function;
};

export const InquiryModal: React.FC<CustomProps> = ({ visible, onClose }) => {
  const [inquiryInput, setInquiryInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    inquiryDetail: '',
  });
  const classes = styles();

  useEffect(() => {
    setInquiryInput({
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      inquiryDetail: '',
    });
  }, [visible]);

  const onSubmitHandler = () => {};

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Inquire about minerals"
      description="This is the original inquiry details"
      icon="message-question-square.svg"
    >
      <div>
        <div style={{ marginBottom: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            First Name
          </span>
          <TextInput
            placeholder="John"
            inputStyle={classes.input}
            value={inquiryInput.firstname}
            onTextChange={(value: string) =>
              setInquiryInput({ ...inquiryInput, firstname: value })
            }
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Last Name
          </span>
          <TextInput
            placeholder="Smith"
            inputStyle={classes.input}
            value={inquiryInput.lastname}
            onTextChange={(value: string) =>
              setInquiryInput({ ...inquiryInput, lastname: value })
            }
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Email
          </span>
          <TextInput
            placeholder="client@email.com"
            inputStyle={classes.input}
            value={inquiryInput.email}
            onTextChange={(value: string) =>
              setInquiryInput({ ...inquiryInput, email: value })
            }
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            Phone
          </span>
          <TextInput
            placeholder="+1 208-528-8735"
            inputStyle={classes.input}
            value={inquiryInput.phoneNumber}
            onTextChange={(value: string) =>
              setInquiryInput({ ...inquiryInput, phoneNumber: value })
            }
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <span className={`${classes.textFont} ${classes.fieldLabel}`}>
            How can we help you?
          </span>
          <TextAreaInput
            placeholder="Inquiry details"
            inputStyle={classes.input}
            value={inquiryInput.inquiryDetail}
            onTextChange={(value: string) =>
              setInquiryInput({ ...inquiryInput, inquiryDetail: value })
            }
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Button
            type="link_gray"
            text="Select Attachment"
            iconLeading="paperclip.svg"
            buttonStyle={classes.uploadButton}
            onClick={() => {}}
          />
        </div>
        <div style={{ marginTop: 22 }}>
          <Button
            text="Submit"
            buttonStyle={classes.button}
            onClick={() => onSubmitHandler()}
          />
        </div>
      </div>
    </Modal>
  );
};

const styles = createUseStyles({
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

  input: {
    width: 356,
  },

  button: {
    width: 399,
    height: 44,
  },

  uploadButton: {
    width: 152,
    height: 20,
    fontSize: 14,
    fontWeight: 600,
  },
});
