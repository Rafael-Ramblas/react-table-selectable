import React from 'react';
import Table from './Components/Table'
import {makeData} from './utils'

function App() {
  return (
    <div className="App">
      <Table data={makeData()}/>>
    </div>
  );
}

export default App;
