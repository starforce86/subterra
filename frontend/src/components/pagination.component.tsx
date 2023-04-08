import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactPaginate from 'react-paginate';

type CustomProps = {
  items: any[];
  itemsPerPage: number;
  Element: React.JSXElementConstructor<any>;
};

type NavButtonProps = {
  isNext: boolean;
  disabled: boolean;
};

const NavButton: React.FC<NavButtonProps> = ({ isNext, disabled }) => {
  const classes = styles();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isNext && <span className={classes.button}>Next</span>}
      <span style={{}}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={
              isNext
                ? 'M4.167 10h11.666m0 0L10 4.167M15.833 10 10 15.834'
                : 'M15.833 10H4.167m0 0L10 15.833M4.167 10 10 4.167'
            }
            stroke={disabled ? '#d0d5dd' : '#475467'}
            strokeWidth="1.667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!isNext && <span className={classes.button}>Previous</span>}
    </div>
  );
};

export const Pagination: React.FC<CustomProps> = ({
  itemsPerPage,
  items,
  Element,
}: CustomProps) => {
  const classes = styles();
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Element currentItems={currentItems} />
      <ReactPaginate
        activeClassName={classes.active}
        containerClassName={classes.pagination}
        pageClassName={classes.paginationPage}
        disabledClassName={classes.disabled}
        breakLabel="..."
        nextLabel={
          <NavButton isNext={true} disabled={items.length <= endOffset} />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<NavButton isNext={false} disabled={itemOffset === 0} />}
        previousClassName={classes.previous}
        nextClassName={classes.next}
      />
    </>
  );
};

const styles = createUseStyles({
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    position: 'relative',
    paddingTop: 25,
    borderTop: ['solid', '1px', '#eaecf0'],

    '-webkitUserSelect': 'none',
    '-msUserSelect': 'none',
    userSelect: 'none',
  },

  paginationPage: {
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
    color: '#475467',
    padding: '10px 10px',
  },

  active: {
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    color: '#1d2939',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 20,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 600,
  },

  previous: {
    cursor: 'pointer',
    left: 0,
    color: '#475467',
    position: 'absolute',
  },

  next: {
    cursor: 'pointer',
    right: 0,
    color: '#475467',
    position: 'absolute',
  },

  disabled: {
    cursor: 'unset',
    color: '#d0d5dd',
  },
});
