import React, { useRef, useEffect, useState } from 'react'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import {
    initTable,
    toggleRow,
    toggleAll,
} from '../../features/table/tableSlice'

import { useDispatch } from 'react-redux'
import TableRowRedux from './components/TableRowRedux'

const Table = ({ data }) => {
    const dispatch = useDispatch()
    const renderCount = useRef(0)
    renderCount.current++

    useEffect(() => {
        dispatch(
            initTable({
                selectedRows: data.reduce(
                    (carry, row) => ({ ...carry, [row.id]: false }),
                    {}
                ),
                tableName: 'testTable',
            })
        )
    }, [data, dispatch])

    return (
        <div>
            Render: {renderCount.current}
            <ReactTable
                getTrProps={(state, rowInfo, column) => {
                    return {
                        rowInfo,
                        tableName: 'testTable',
                    }
                }}
                data={data}
                columns={[
                    {
                        Header: (
                            <button
                                onClick={() =>
                                    dispatch(
                                        toggleAll({ tableName: 'testTable' })
                                    )
                                }
                            >
                                SELECT ALL
                            </button>
                        ),
                        accessor: (row) => (
                            <button
                                onClick={() =>
                                    dispatch(
                                        toggleRow({
                                            id: row.id,
                                            tableName: 'testTable',
                                        })
                                    )
                                }
                            >
                                SELECT ROW
                            </button>
                        ),
                        id: 'select',
                        sortable: false,
                    },
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },

                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                ]}
                defaultPageSize={500}
                TrComponent={TableRowRedux}
            />
        </div>
    )
}

// const Table = ({ data }) => {
//     const [selectedRows, setSelectedRows] = useState([])
//     const renderCount = useRef(0)

//     const handleSelectAll = () =>
//         setSelectedRows(data.reduce((carry, row) => carry.concat(row.id), []))
//     const handleDeselectAll = () => setSelectedRows([])

//     const onClickSelectAll =
//         selectedRows.length > 0 ? handleDeselectAll : handleSelectAll

//     const handleSelectRow = (row) => setSelectedRows(selectedRows.concat(row))
//     const handleDeselectRow = (id) =>
//         setSelectedRows(
//             selectedRows.filter((selectedRowId) => selectedRowId != id)
//         )

//     const getTrProps = (state, rowInfo, instance) => {
//         if (rowInfo) {
//             return {
//                 style: {
//                     background: selectedRows.includes(rowInfo.original.id)
//                         ? 'red'
//                         : 'white',
//                 },
//             }
//         }
//         return {}
//     }

//     renderCount.current++
//     return (
//         <div>
//             Render: {renderCount.current}
//             <ReactTable
//                 getTrProps={getTrProps}
//                 data={data}
//                 columns={[
//                     {
//                         Header: (
//                             <button onClick={onClickSelectAll}>
//                                 SELECT ALL
//                             </button>
//                         ),
//                         accessor: (row) => (
//                             <button
//                                 onClick={() =>
//                                     selectedRows.includes(row.id)
//                                         ? handleDeselectRow(row.id)
//                                         : handleSelectRow(row.id)
//                                 }
//                             >
//                                 SELECT ROW
//                             </button>
//                         ),
//                         id: 'selects',
//                         sortable: false,
//                     },
//                     {
//                         Header: 'First Name',
//                         accessor: 'firstName',
//                     },
//                     {
//                         Header: 'Age',
//                         accessor: 'age',
//                     },
//                     {
//                         Header: 'Status',
//                         accessor: 'status',
//                     },

//                     {
//                         Header: 'Visits',
//                         accessor: 'visits',
//                     },
//                 ]}
//                 defaultPageSize={500}
//             />
//         </div>
//     )
// }

export default Table
