import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Pagination } from '../../../components/pagination.component';
import { Table } from '../../../components/table.component';
import { InquiryDeclineModal } from './inquiry-decline.component';
import { InquiryDetailsModal } from './inquiry-details.component';

const generateTempData = (): Record<string, any>[] => {
  const records = [];
  const categories = [
    'Buy / Grow Portfolio',
    'Sell',
    'Get connected with service',
  ];
  const statuses = [
    'Complete',
    'Declined',
    'In Progress',
    'Pending',
    'Needs Attention',
  ];

  for (let i = 0; i < 100; i++) {
    const today = new Date();
    records.push({
      date: new Date((today as any) - Math.random() * 1e12),
      id: 'ABCD' + `${i}`.padStart(4, '0'),
      alias: 'This is the alias name',
      category: categories[Math.floor(Math.random() * categories.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return records;
};

export const PaginatedInquiriesTable: React.FC<{ currentItems: any[] }> = ({
  currentItems,
}) => {
  const classes = styles();
  const [modalVisible, setModalVisible] = useState(false);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const inquiriesColumn = [
    {
      name: 'Date',
      selector: (row: Record<string, any>) => (
        <span>
          {row.date.toLocaleString('en-us', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
      sortable: true,
      sortFunction: (a: Record<string, any>, b: Record<string, any>) =>
        a.date > b.date ? 1 : -1,
    },
    {
      name: 'Inquiry ID',
      selector: (row: Record<string, any>) => (
        <span style={{ fontWeight: 600 }}>{row.id}</span>
      ),
    },
    {
      name: 'Status',
      selector: (row: Record<string, any>) => {
        let color = '#000';
        if (row.status === 'Complete') color = '#31a672';
        else if (row.status === 'Declined') color = '#c11574';
        else if (row.status === 'In Progress') color = '#0086c9';
        else if (row.status === 'Pending') color = '#f47b35';
        else if (row.status === 'Needs Attention') color = '#c04b41';

        return (
          <div
            style={{
              borderRadius: 16,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: color,
              padding: '3px 5px',
              color,
            }}
          >
            {row.status}
          </div>
        );
      },
    },
    {
      name: 'Property Alias',
      selector: (row: Record<string, any>) => row.alias,
    },
    {
      name: 'Actions',
      selector: (row: Record<string, any>) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            type="link_color"
            text="Accept"
            buttonStyle={classes.detailsButton}
            onClick={() => {}}
          />
          <Button
            type="link_color"
            text="Decline"
            destructive={true}
            buttonStyle={classes.detailsButton}
            onClick={() => setDeclineModalVisible(true)}
          />
        </div>
      ),
    },
    {
      name: '',
      selector: (row: Record<string, any>) => (
        <Button
          type="link_color"
          text="Details"
          buttonStyle={classes.detailsButton}
          onClick={() => {
            setInquiryId(row.id);
            setModalVisible(true);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Table columns={inquiriesColumn} data={currentItems} selectable={true} />
      <InquiryDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => {}}
        inquiryId={inquiryId}
      />
      <InquiryDeclineModal
        visible={declineModalVisible}
        onClose={() => setDeclineModalVisible(false)}
        onSubmit={() => {}}
        inquiryId={inquiryId}
      />
    </>
  );
};

export const InquiriesComponent: React.FC = () => {
  const classes = styles();
  const [records, setRecords] = useState(generateTempData());

  useEffect(() => {
    setRecords(generateTempData());
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>Inquiries</span>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
          <span className={classes.subheader}>These are list of inquiries</span>
          <Button
            type="link_gray"
            text=""
            iconLeading="download-cloud-01.svg"
            buttonStyle={classes.iconButton}
            onClick={() => {}}
          />
          <Button
            type="link_gray"
            text=""
            iconLeading="archive.svg"
            buttonStyle={classes.iconButton}
            onClick={() => {}}
          />
          <Button
            type="link_gray"
            text=""
            iconLeading="trash-01.svg"
            buttonStyle={classes.iconButton}
            onClick={() => {}}
          />
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <Pagination
          items={records}
          itemsPerPage={10}
          Element={PaginatedInquiriesTable}
        />
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

  subheader: {
    fontSize: 14,
    color: '#475467',
    marginRight: 20,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    color: '#344054',
    marginRight: 15,
    lineHeight: 2,
  },

  checkbox: {
    color: '#344054',
    minWidth: 'max-content',
    marginRight: 15,
    fontWeight: 500,
  },

  fieldInput: {
    width: 370,
  },

  button: {
    height: 44,
    width: 209,
  },

  iconButton: {
    height: 20,
    width: 20,
    marginRight: 20,
  },

  sellField: {
    width: 62,
  },

  detailsButton: {
    width: 47,
    height: 20,
    fontSize: 14,
    marginRight: 20,
  },
});
