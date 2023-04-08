import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Modal } from '../../../components/modal.component';
import { Table } from '../../../components/table.component';
import { TextAreaInput } from '../../../components/text-area.component';
import { TextInput } from '../../../components/text-input.component';

type CustomProps = {
  visible: boolean;
  onClose: Function;
  onSubmit: Function;
  inquiryId: string;
};

export const InquiryDetailsModal: React.FC<CustomProps> = ({
  visible,
  onClose,
  onSubmit,
  inquiryId,
}) => {
  const classes = styles();
  const [inquiry, setInquiry] = useState({} as any);
  const [message, setMessage] = useState({} as any);

  const messagesColumn = [
    {
      name: 'Date',
      selector: (row: Record<string, any>) => row.date,
    },
    {
      name: 'Sender',
      selector: (row: Record<string, any>) => (
        <span style={{ fontWeight: 600 }}>{row.sender}</span>
      ),
    },
    {
      name: 'Message',
      selector: (row: Record<string, any>) => row.message,
    },
    {
      name: 'File Attachment',
      selector: (row: Record<string, any>) => (
        <span style={{ fontWeight: 600 }}>{row.attachment}</span>
      ),
    },
  ];

  useEffect(() => {
    setInquiry({
      servicesOwnerNeedsHelpWith: 'List of services required',
      comment: 'comments',
      messages: [
        {
          date: '2020-05-01 06:05:46',
          sender: 'Julia Smith',
          message: 'This is a sample message',
          attachment: 'file.jpg',
        },
        {
          date: '2020-05-01 06:05:46',
          sender: 'Julia Smith',
          message: 'This is a sample message',
          attachment: 'file.jpg',
        },
        {
          date: '2020-05-01 06:05:46',
          sender: 'Julia Smith',
          message: 'This is a sample message',
          attachment: 'file.jpg',
        },
      ],
    });
  }, []);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Inquiry Details"
      description="This is the original inquiry details"
      icon="file-check-02.svg"
    >
      {Object.keys(inquiry).length > 0 && (
        <>
          <div className={classes.container}>
            <div
              style={{
                marginBottom: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Services Owner needs help with
              </span>
              <TextAreaInput
                placeholder="Value"
                inputStyle={classes.textAreaInput}
                value={inquiry.servicesOwnerNeedsHelpWith}
                onTextChange={() => {}}
                disabled={true}
              />
            </div>
            <div
              style={{
                marginBottom: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                Owner&rsquo;s comments
              </span>
              <TextAreaInput
                placeholder="Value"
                inputStyle={classes.textAreaInput}
                value={inquiry.comment}
                onTextChange={() => {}}
                disabled={true}
              />
            </div>
            <div
              style={{
                marginBottom: 12,
                borderTop: 'solid',
                borderWidth: 0.5,
                borderColor: '#eaecf0',
              }}
            >
              <Table columns={messagesColumn} data={inquiry.messages} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <span className={`${classes.textFont} ${classes.fieldLabel}`}>
                New Message
              </span>
              <TextInput
                placeholder="Recipient's Name"
                value={message.recipient}
                inputStyle={classes.inputFull}
                onTextChange={(value: any) =>
                  setMessage({ ...message, recipient: value })
                }
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <TextAreaInput
                placeholder="Message"
                inputStyle={classes.inputFull}
                value={message.message}
                onTextChange={(value: any) =>
                  setMessage({ ...message, message: value })
                }
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <Button
                type="link_gray"
                text="Select Attachment"
                iconLeading="paperclip.svg"
                buttonStyle={classes.attachmentButton}
                onClick={() => onSubmit()}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <Button
                text="Send"
                buttonStyle={classes.button}
                onClick={() => onSubmit()}
              />
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 'max-content',
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
    width: 120,
    marginRight: 60,
  },

  fieldInput: {
    width: 320,
  },

  button: {
    width: 672,
    height: 44,
  },

  attachmentButton: {
    width: 155,
    height: 44,
    fontSize: 14,
  },

  inputFull: {
    width: 630,
  },

  textAreaInput: {
    width: 450,
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

  checkbox: {
    marginRight: 22,
    color: '#344054',
    minWidth: 'max-content',
  },
});
