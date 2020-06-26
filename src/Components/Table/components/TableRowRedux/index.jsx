import React, { useState, useEffect } from 'react'
import get from 'lodash/get'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { useSelector } from 'react-redux'

const TableRowRedux = ({ children, tableName, rowInfo }) => {
    const rowId = rowInfo && rowInfo.original.id
    const isSelected = useSelector(({ table }) =>
        get(table, `${tableName}.${rowId}`, false)
    )

    return (
        <ReactTable.defaultProps.TrComponent
            style={{ background: isSelected ? 'red' : 'white' }}
        >
            {children}
        </ReactTable.defaultProps.TrComponent>
    )
}

export default TableRowRedux
