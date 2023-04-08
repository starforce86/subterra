import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { Dropdown } from '../../../components/dropdown.component';
import { Table } from '../../../components/table.component';
import { Tag } from '../../../components/tag.component';
import { TextInput } from '../../../components/text-input.component';

type SearchPropertiesProps = {
  data: Record<string, any>;
  onInputChange: Function;
  onSearch: Function;
  onClear: Function;
};

type SearchResultsProps = {
  data: Record<string, any>;
  results: Record<string, any>[];
  onSearchAgain: Function;
};

const SearchProperties: React.FC<SearchPropertiesProps> = ({
  data,
  onInputChange,
  onSearch,
  onClear,
}) => {
  const classes = styles();

  return (
    <div>
      <div className={`${classes.text} ${classes.searchPropertiesContainer}`}>
        <span className={classes.titleHeader}>Search Properties</span>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>State</span>
          <Dropdown
            options={[
              { label: 'California', value: 'California' },
              { label: 'Kansas', value: 'Kansas' },
              { label: 'Michigan', value: 'Michigan' },
              { label: 'New Jersey', value: 'New Jersey' },
            ]}
            selectedOption={data.state}
            onChange={(value: any) => onInputChange('state', value)}
            placeholder="State"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            County
          </span>
          <Dropdown
            options={[{ label: 'Los Angeles', value: 'Los Angeles' }]}
            selectedOption={data.county}
            onChange={() => (value: any) => onInputChange('county', value)}
            placeholder="State"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>Town</span>
          <TextInput
            value={data.town}
            placeholder="Pasadena"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) => onInputChange('town', value)}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Owners
          </span>
          <TextInput
            value={data.owners}
            placeholder="John Smith, Carol Davis, William Lawson"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) => onInputChange('owners', value)}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Percent Ownership
          </span>
          <TextInput
            value={data.percentOwnership}
            placeholder="15%"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) =>
              onInputChange('percentOwnership', value)
            }
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Mineral
          </span>
          <TextInput
            value={data.mineral}
            placeholder="Oil &amp; Gold"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) => onInputChange('mineral', value)}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Legal Description
          </span>
          <TextInput
            value={data.legalDescription}
            placeholder="Any"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) =>
              onInputChange('legalDescription', value)
            }
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={`${classes.text} ${classes.fieldLabel}`}>
            Supporting documents
          </span>
          <TextInput
            value={data.supportingDocuments}
            placeholder="Land title"
            inputStyle={classes.fieldInput}
            onTextChange={(value: string) =>
              onInputChange('supportingDocuments', value)
            }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            text="Search"
            buttonStyle={classes.button}
            onClick={() => onSearch()}
          />
          <Button
            type="secondary_color"
            text="Clear"
            buttonStyle={classes.button}
            onClick={() => onClear()}
          />
        </div>
      </div>
    </div>
  );
};

const SearchResult: React.FC<SearchResultsProps> = ({
  data,
  results,
  onSearchAgain,
}) => {
  const classes = styles();
  const searchResultColumn = [
    {
      name: 'Owner Name',
      selector: (row: Record<string, any>) => (
        <span style={{ fontWeight: 600 }}>{row.owner}</span>
      ),
    },
    {
      name: 'Property',
      selector: (row: Record<string, any>) => row.property,
    },
    {
      name: 'Mineral Owner Records',
      selector: (row: Record<string, any>) => row.mineralOwnerRecords,
    },
    {
      name: 'Legal Description',
      selector: (row: Record<string, any>) => row.legalDescription,
    },
  ];

  return (
    <>
      <span className={classes.titleHeader}>Search Results</span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{
            width: '40%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 12,
          }}
        >
          {Object.keys(data)
            .filter((e) => !!data[e])
            .map((e, i) => (
              <Tag
                key={i}
                text={data[e].label ?? data[e]}
                onClick={() => {}}
                tagStyle={classes.tag}
              />
            ))}
        </div>
        <div>
          <Button
            text="Search Again"
            iconLeading="search-sm-02.svg"
            buttonStyle={classes.searchAgainButton}
            onClick={() => onSearchAgain()}
          />
        </div>
      </div>
      <Table columns={searchResultColumn} data={results} />
    </>
  );
};

export const SearchComponent: React.FC = () => {
  const initData = {
    state: { label: 'Michigan', value: 'Michigan' },
    county: { label: 'Los Angeles', value: 'Los Angeles' },
    town: '',
    owners: '',
    percentOwnership: '',
    mineral: '',
    legalDescription: '',
    supportingDocuments: '',
  };
  const classes = styles();
  const [data, setData] = useState(initData);
  const [searchResult, setSearchResult] = useState([] as any);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const inputHandler = (name: string, value: any) => {
    setData({ ...data, [name]: value });
  };

  const onSearch = () => {
    setSearchResult([
      {
        owner: 'John Smith',
        property: 'Farm Land',
        mineralOwnerRecords: '#00928776265',
        legalDescription: '5.3.6.1.1.	S-6 T-5S R-6W',
      },
      {
        owner: 'Carol Davis',
        property: 'Farm Land',
        mineralOwnerRecords: '#65926265877',
        legalDescription: '5.3.6.1.6.	6-5S-6W',
      },
      {
        owner: 'William Lawson',
        property: 'Farm Land',
        mineralOwnerRecords: '#22138756031',
        legalDescription: '5.3.6.1.7.	06-05-06',
      },
    ]);
    setSearchCompleted(true);
  };

  const onClear = () => {
    setData(initData);
  };

  const onSearchAgain = () => {
    setSearchCompleted(false);
  };

  return (
    <div className={classes.container}>
      {!searchCompleted && (
        <SearchProperties
          data={data}
          onInputChange={inputHandler}
          onSearch={onSearch}
          onClear={onClear}
        />
      )}
      {searchCompleted && (
        <SearchResult
          data={data}
          results={searchResult}
          onSearchAgain={onSearchAgain}
        />
      )}
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

  imageContainer: {
    position: 'relative',
    height: 371,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  imageInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(24px)',
    '-webkitBackdropFilter': 'blur(24px)',
    color: '#fff',
    border: 'solid 1px rgba(255, 255, 255, 0.5)',
  },

  searchPropertiesContainer: {
    marginTop: 21,
    display: 'flex',
    flexDirection: 'column',
    width: 370,
    marginBottom: 50,
  },

  titleHeader: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'left',
    color: '#101828',
  },

  propertyDetail: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#475467',
    textAlign: 'justify',
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    color: '#000000',
    lineHeight: 2,
  },

  fieldInput: {
    width: 370,
  },

  button: {
    height: 41,
    width: 125,
    fontSize: 16,
    marginBottom: 10,
    marginRight: 25,
    marginTop: 20,
  },

  searchAgainButton: {
    height: 36,
    width: 150,
    fontSize: 14,
    marginBottom: 10,
  },

  tag: {
    marginRight: 7,
    marginBottom: 8,
    height: 16,
  },
});
