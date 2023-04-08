import React, { ReactElement } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { createUseStyles } from 'react-jss';
import { Button } from './button.component';

type CustomProps = {
  title?: string;
  columns: any;
  data: Record<string, any>[];
  onAdd?: Function;
  addText?: string;
  selectable?: boolean;
};

export const Table: React.FC<CustomProps> = ({
  title = '',
  columns,
  data,
  onAdd,
  addText = '',
  selectable = false,
}: CustomProps): ReactElement => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className={`${classes.text} ${classes.headerText}`}>{title}</span>
        {!!onAdd && (
          <Button
            type="link_color"
            text={addText}
            iconLeading="plus-circle.svg"
            buttonStyle={classes.button}
            onClick={() => onAdd()}
          />
        )}
      </div>
      <DataTable
        columns={columns}
        data={data}
        striped
        theme="tableStyle"
        selectableRows={selectable}
      />
    </div>
  );
};

createTheme('tableStyle', {
  background: {
    default: '#f9fafb',
  },
  striped: {
    default: '#fff',
  },
});

const styles = createUseStyles({
  container: {
    width: '100%',
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerText: {
    fontSize: 24,
    fontWeight: 600,
  },

  icon: {
    height: 24,
    width: 24,
    marginLeft: 35,
    cursor: 'pointer',
  },

  button: {
    width: 'max-content',
    fontSize: 14,
  },
});
