import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { Dropdown } from '../../../components/dropdown.component';
import { TabView } from '../../../components/tab-view.component';
import { TextAreaInput } from '../../../components/text-area.component';
import { TextInput } from '../../../components/text-input.component';

const BuyGrowPortfolio: React.FC = () => {
  const classes = styles();
  const [data, setData] = useState({} as any);

  const inputHandler = (name: string, value: any) => {
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Looking for
          </span>
          <CheckBoxInput
            checked={data.lookingFor === 'purchase'}
            onChange={() => inputHandler('lookingFor', 'purchase')}
            inputStyle={classes.checkbox}
            text="Purchase"
          />
          <CheckBoxInput
            checked={data.lookingFor === 'lease'}
            onChange={() => inputHandler('lookingFor', 'lease')}
            inputStyle={classes.checkbox}
            text="Lease"
          />
          <CheckBoxInput
            checked={data.lookingFor === 'not_sure'}
            onChange={() => inputHandler('lookingFor', 'not_sure')}
            inputStyle={classes.checkbox}
            text="Not Sure"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Mineral of interest
          </span>
          <TextInput
            placeholder="Oil &amp; Gas, Oil, Gas, Water, Carbon, Rare Earth, Other"
            inputStyle={classes.fieldInput}
            value={data.mineralInterest}
            onTextChange={(value: string) =>
              inputHandler('mineralInterest', value)
            }
          />
        </div>
        <div style={{ marginTop: 12, width: 412 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Where are you looking?
          </span>
          <Dropdown
            options={[
              { label: 'California', value: 'California' },
              { label: 'Kansas', value: 'Kansas' },
              { label: 'Michigan', value: 'Michigan' },
              { label: 'New Jersey', value: 'New Jersey' },
            ]}
            selectedOption={{ label: data.county, value: data.county }}
            onChange={(value: any) => inputHandler('county', value.value)}
            placeholder="Value"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            County
          </span>
          <TextInput
            placeholder="Indicate county name"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) => inputHandler('county', value)}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            How can we help you?
          </span>
          <TextAreaInput
            placeholder="Enter your comments"
            inputStyle={classes.fieldInput}
            value={data.comment}
            onTextChange={(value: string) => inputHandler('comment', value)}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            text="Submit"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
};

const Sell: React.FC = () => {
  const classes = styles();
  const [data, setData] = useState({} as any);
  const [properties, setProperties] = useState([] as any[]);
  const [minerals, setMinerals] = useState([] as any[]);

  useEffect(() => {
    // Get Properties
    setProperties([
      {
        id: 'property1',
        name: 'Property 1',
        selected: false,
      },
      {
        id: 'property2',
        name: 'Property 2',
        selected: false,
      },
      {
        id: 'property3',
        name: 'Property 3',
        selected: false,
      },
    ]);
    // Get Minerals
    setMinerals([
      {
        id: 'mineral1',
        name: 'Mineral 1',
        selected: false,
      },
      {
        id: 'mineral2',
        name: 'Mineral 2',
        selected: false,
      },
      {
        id: 'mineral3',
        name: 'Mineral 3',
        selected: false,
      },
    ]);
  }, []);

  const inputHandler = (name: string, value: any) => {
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {properties.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <span className={`${classes.text} ${classes.fieldLabel}`}>
              Which property do you wish to sell?
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {properties.map((e) => (
                <CheckBoxInput
                  key={e.id}
                  checked={e.selected}
                  onChange={() => {
                    const idx = properties.findIndex((obj) => obj.id === e.id);
                    properties[idx].selected = !properties[idx].selected;
                    setProperties([...properties]);
                  }}
                  inputStyle={classes.checkbox}
                  text={e.name}
                />
              ))}
            </div>
          </div>
        )}
        {minerals.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <span className={`${classes.text} ${classes.fieldLabel}`}>
              Which mineral do you wish to sell?
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {minerals.map((e) => (
                <CheckBoxInput
                  key={e.id}
                  checked={e.selected}
                  onChange={() => {
                    const idx = minerals.findIndex((obj) => obj.id === e.id);
                    minerals[idx].selected = !minerals[idx].selected;
                    setMinerals([...minerals]);
                  }}
                  inputStyle={classes.checkbox}
                  text={e.name}
                />
              ))}
            </div>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            % wishing to sell for each selected Right
          </span>
          <TextInput
            placeholder="45%"
            inputStyle={classes.sellField}
            value={data.mineralInterest}
            onTextChange={(value: string) =>
              inputHandler('mineralInterest', value)
            }
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            text="Add Property"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
};

const GetConnectedWithService: React.FC = () => {
  const classes = styles();
  const [data, setData] = useState({} as any);
  const [services, setServices] = useState([
    {
      id: 'loanAgainstAssets',
      name: 'Loan Against Assets',
      selected: false,
    },
    {
      id: 'landmanEscheatmentIssues',
      name: 'Landman - Escheatment Issues',
      selected: false,
    },
    {
      id: 'estateLawyerPlanning',
      name: 'Estate Lawyer - Planning',
      selected: false,
    },
    {
      id: 'divisionOrderAssistance',
      name: 'Division Order Assistance',
      selected: false,
    },
    {
      id: 'estateLawyerProbate',
      name: 'Estate Lawyer - Probate',
      selected: false,
    },
    {
      id: 'estateManagementFirms',
      name: 'Estate Management Firms',
      selected: false,
    },
    {
      id: 'oilGasLawyer',
      name: 'Oil &amp; Gas Lawyer',
      selected: false,
    },
    {
      id: 'auditingRevenue',
      name: 'Auditing Revenue',
      selected: false,
    },
    {
      id: 'appraiseAssets',
      name: 'Appraise Assets',
      selected: false,
    },
    {
      id: 'cpaTaxHelp',
      name: 'CPA - Tax Help',
      selected: false,
    },
    {
      id: 'landmanOwnershipIssues',
      name: 'Landman - Ownership Issues',
      selected: false,
    },
    {
      id: 'sellAssetsAuction',
      name: 'Sell Assets - Auction',
      selected: false,
    },
    {
      id: 'landmanLeaseNegotiation',
      name: 'Landman - Lease Negotiation',
      selected: false,
    },
    {
      id: 'sellAssetsBroker',
      name: 'Sell Assets - Broker',
      selected: false,
    },
    {
      id: 'landmanCourthouseWork',
      name: 'Landman - Courthouse Work',
      selected: false,
    },
  ]);

  const inputHandler = (name: string, value: any) => {
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            What kind of service do you need help with today?
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              width: 500,
            }}
          >
            {services.map((e) => (
              <CheckBoxInput
                key={e.id}
                checked={e.selected}
                onChange={() => {
                  const idx = services.findIndex((obj) => obj.id === e.id);
                  services[idx].selected = !services[idx].selected;
                  setServices([...services]);
                }}
                inputStyle={classes.checkbox}
                text={e.name}
              />
            ))}
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Specify your needs
          </span>
          <TextAreaInput
            placeholder="Enter your comments"
            inputStyle={classes.fieldInput}
            value={data.comment}
            onTextChange={(value: string) => inputHandler('comment', value)}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <Button
            text="Submit"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export const ManageMyRightComponent: React.FC = () => {
  const classes = styles();
  const [activePage, setActivePage] = useState('buyGrowPortflio');

  const tabs = [
    {
      id: 'buyGrowPortflio',
      text: 'Buy / Grow Portfolio',
      element: <BuyGrowPortfolio />,
      onSelect: () => setActivePage('buyGrowPortflio'),
    },
    {
      id: 'sell',
      text: 'Sell',
      element: <Sell />,
      onSelect: () => setActivePage('sell'),
    },
    {
      id: 'getConnectedWithService',
      text: 'Get Connected With Service',
      element: <GetConnectedWithService />,
      onSelect: () => setActivePage('getConnectedWithService'),
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>Manage My Rights</span>
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
});
