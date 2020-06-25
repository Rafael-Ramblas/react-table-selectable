import React, { useState, useRef, useEffect } from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import {
  selectAll,
  deselectAll,
  selectAllValue,
  deselectAllValue,
} from "../../features/tableSelectors/selectorSlice";

import { useSelector, useDispatch } from "react-redux";

// const TableRow = ({
//   children,
//   rowInfo,
//   toggleHash,
//   selectedHash,
//   ...props
// }) => {
//   const [selected, setSelected] = useState(false);
//   const dispatch = useDispatch();
//   const selectedAllHash = useSelector(selectAllValue);
//   const deselectAllHash = useSelector(deselectAllValue);

//   const handleToggleAll = () =>
//     dispatch(selected ? deselectAll() : selectAll());

//   useEffect(() => {
//     selectedAllHash && setSelected(true);
//   }, [selectedAllHash]);

//   useEffect(() => {
//     deselectAllHash && setSelected(false);
//   }, [deselectAllHash]);

//   // const composedColumns = [selectable].concat(children);
//   return rowInfo ? (
//     <ReactTable.defaultProps.TrComponent
//       style={{ background: selected ? "red" : "white" }}
//     >
//       {[]
//         .concat(
//           <button onClick={() => setSelected(!selected)}>SELECT ROW</button>
//         )
//         .concat(children)}
//     </ReactTable.defaultProps.TrComponent>
//   ) : (
//     <ReactTable.defaultProps.TrComponent>
//       {[]
//         .concat(<button onClick={handleToggleAll}>SELECT ALL</button>)
//         .concat(children)}
//     </ReactTable.defaultProps.TrComponent>
//   );
// };

// const Table = ({ data }) => {
//   const renderCount = useRef(0);
//   renderCount.current++;

//   return (
//     <div>
//       Render: {renderCount.current}
//       <ReactTable
//         getTrProps={(state, rowInfo, column) => {
//           return {
//             rowInfo,
//           };
//         }}
//         data={data}
//         columns={[
//           {
//             Header: "First Name",
//             accessor: "firstName",
//           },
//           {
//             Header: "Age",
//             accessor: "age",
//           },
//           {
//             Header: "Status",
//             accessor: "status",
//           },

//           {
//             Header: "Visits",
//             accessor: "visits",
//           },
//         ]}
//         defaultPageSize={500}
//         TrComponent={TableRow}
//       />
//     </div>
//   );
// };


const Table = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectAll = () =>
    setSelectedRows(data.reduce((carry, row) => carry.concat(row.id), []));
  const handleDeselectAll = () => setSelectedRows([]);
  const onClickSelectAll =
    selectedRows.length > 0 ? handleDeselectAll : handleSelectAll;

  const handleSelectRow = (row) => setSelectedRows(selectedRows.concat(row));
  const handleDeselectRow = (id) =>
    setSelectedRows(selectedRows.filter((selectedRowId) => selectedRowId != id));

  const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        style: {
          background: selectedRows.includes(rowInfo.original.id) ? "red" : "white",
        },
      };
    }
    return {};
  };

  return (
    <ReactTable
      getTrProps={getTrProps}
      data={data}
      columns={[
        {
          Header: <button onClick={onClickSelectAll}>SELECT ALL</button>,
          accessor: (row) => (
            <button
              onClick={() =>
                selectedRows.includes(row.id)
                  ? handleDeselectRow(row.id)
                  : handleSelectRow(row.id)
              }
            >
              SELECT ROW
            </button>
          ),
          id: "selects",
        },
        {
          Header: "First Name",
          accessor: "firstName",
        },
        {
          Header: "Age",
          accessor: "age",
        },
        {
          Header: "Status",
          accessor: "status",
        },

        {
          Header: "Visits",
          accessor: "visits",
        },
      ]}
      defaultPageSize={500}
    />
  );
};




export default Table;
