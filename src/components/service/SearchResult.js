// @flow
import React from 'react';
import { Header } from 'semantic-ui-react';

export type Props = {
  filterData: ?any,
};

function SearchResult(props: Props) {
  return (
    <div>
      <Header as="h1" textAlign="center">
        Suchresultate
      </Header>
    </div>
  );
}

export default SearchResult;
