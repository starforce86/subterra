import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { toast } from 'react-toastify';
import { Button } from '../../../components/button.component';
import { Modal } from '../../../components/modal.component';
import { TextInput } from '../../../components/text-input.component';
import { resetPassword } from '../../../services/user.action';

type CustomProps = {
  visible: boolean;
  onClose: Function;
};

export const ForgotPasswordModal: React.FC<CustomProps> = ({
  visible,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const classes = styles();

  const onSubmitHandler = () => {
    if (!email) {
      setError(true);
      return;
    }

    resetPassword(email).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.detail);
        onClose();
      } else {
        toast.error(res.data?.email[0] || 'Error resetting password');
        setError(true);
      }
    });
  };

  useEffect(() => setEmail(''), [visible]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Forgot Password?"
      description="Helper text"
      icon="lock-01.svg"
    >
      <div>
        <span className={`${classes.textFont} ${classes.fieldLabel}`}>
          Email
        </span>
        <TextInput
          placeholder="client@email.com"
          inputStyle={classes.emailInput}
          value={email}
          onTextChange={(value: string) => {
            setError(false);
            setEmail(value);
          }}
          error={error}
        />
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

  emailInput: {
    width: 356,
  },

  button: {
    width: 399,
    height: 44,
  },
});
