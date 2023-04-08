import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Rating } from 'react-simple-star-rating';
import { Button } from '../../../components/button.component';
import { Pagination } from '../../../components/pagination.component';
import { TabView } from '../../../components/tab-view.component';
import { Table } from '../../../components/table.component';
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

const generateTempServiceCompanyData = (): Record<string, any>[] => {
  const records = [];

  for (let i = 0; i < 50; i++) {
    records.push({
      name: `Company Name ${i + 1}`,
      phone: '+1 712-890-3914',
      address: '1800 N 16th St, Council Bluffs, IA 51501,',
      rating: Math.floor(Math.random() * 5),
    });
  }
  return records;
};

export const PaginatedInquiriesTable: React.FC<{ currentItems: any[] }> = ({
  currentItems,
}) => {
  const classes = styles();
  const [modalVisible, setModalVisible] = useState(false);
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
      name: 'Property Alias',
      selector: (row: Record<string, any>) => row.alias,
    },
    {
      name: 'Category',
      selector: (row: Record<string, any>) => row.category,
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
    </>
  );
};

const Inquiries: React.FC = () => {
  const [records, setRecords] = useState(generateTempData());

  useEffect(() => {
    setRecords(generateTempData());
  }, []);

  return (
    <>
      <Pagination
        items={records}
        itemsPerPage={10}
        Element={PaginatedInquiriesTable}
      />
    </>
  );
};
export const PaginatedServiceCompanyTable: React.FC<{
  currentItems: any[];
}> = ({ currentItems }) => {
  const serviceCompanyColumn = [
    {
      name: 'Service Company',
      selector: (row: Record<string, any>) => row.name,
    },
    {
      name: 'Phone',
      selector: (row: Record<string, any>) => row.phone,
    },
    {
      name: 'Address',
      selector: (row: Record<string, any>) => row.address,
    },
    {
      name: 'Rating',
      selector: (row: Record<string, any>) => (
        <Rating initialValue={row.rating} readonly size={20} />
      ),
    },
  ];

  return <Table columns={serviceCompanyColumn} data={currentItems} />;
};

const ServiceCompany: React.FC = () => {
  const [records, setRecords] = useState(generateTempData());

  useEffect(() => {
    setRecords(generateTempServiceCompanyData());
  }, []);

  return (
    <>
      <Pagination
        items={records}
        itemsPerPage={10}
        Element={PaginatedServiceCompanyTable}
      />
    </>
  );
};

export const InquiriesComponent: React.FC = () => {
  const classes = styles();
  const [activePage, setActivePage] = useState('inquiries');

  const tabs = [
    {
      id: 'inquiries',
      text: 'Inquiries',
      element: <Inquiries />,
      onSelect: () => setActivePage('inquiries'),
    },
    {
      id: 'serviceCompany',
      text: 'Service Company',
      element: <ServiceCompany />,
      onSelect: () => setActivePage('serviceCompany'),
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>Inquiries</span>
      </div>
      <div style={{ width: '100%' }}>
        <TabView tabs={tabs} activePage={activePage} />
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

  sellField: {
    width: 62,
  },

  detailsButton: {
    width: 47,
    height: 20,
  },
});
