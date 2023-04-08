import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import AnnotationQuestion from '../../../assets/annotation-question.svg';
import { Button } from '../../../components/button.component';

type CustomProps = {
  title: string;
  description: string;
  link: string;
};

export const CardComponent: React.FC<CustomProps> = ({
  title,
  description,
  link,
}) => {
  const classes = styles();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        backgroundColor: '#f9fafb',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          backgroundColor: '#336b8e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={AnnotationQuestion} style={{ height: 24, width: 24 }} />
      </div>
      <div style={{ marginTop: 35 }}>
        <span className={`${classes.text} ${classes.title}`}>{title}</span>
      </div>
      <div style={{ marginTop: 8 }}>
        <span className={`${classes.text} ${classes.description}`}>
          {description}
        </span>
      </div>
      <div style={{ marginTop: 8 }}>
        <Button
          type="link_color"
          text="Link to topic"
          iconTrailing="arrow-right.svg"
          buttonStyle={classes.button}
          onClick={() => navigate(link)}
        />
      </div>
    </div>
  );
};

const styles = createUseStyles({
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontStretch: 'normal',
    textAlign: 'left',
  },

  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#000',
  },

  position: {
    fontSize: 16,
    color: '#336b8e',
  },

  description: {
    fontSize: 16,
    color: '#101828',
  },

  button: {
    width: 140,
    height: 24,
    fontSize: 16,
    fontWeight: 600,
  },
});
