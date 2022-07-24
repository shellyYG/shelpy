import { useEffect } from 'react';
import { useState } from 'react';
import PaginationSingleItem from './PaginationSingleItem';

const PaginationItems = (props) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const numberOfPages = [];
    for (let i = 0; i < props.pages; i++) {
      numberOfPages.push(i+1);
    }
    setPages(numberOfPages);
  }, [props.pages]);

  return (
    <>
      {props.pages && (
        <ul className='pagination'>
          {pages.map((page) => (
            <PaginationSingleItem
              number={page}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default PaginationItems;
