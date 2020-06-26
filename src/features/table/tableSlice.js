import { createSlice } from '@reduxjs/toolkit'

export const selectorSlice = createSlice({
    name: 'selector',
    initialState: {},
    reducers: {
        initTable: {
            reducer: (state, action) => {
                return {
                    ...state,
                    [action.payload.tableName]: action.payload.selectedRows,
                }
            },
            prepare: ({ tableName, selectedRows }) => ({
                payload: { tableName, selectedRows },
            }),
        },
        toggleRow: {
            reducer: (state, action) => {
                state[action.payload.tableName][action.payload.id] = !state[
                    action.payload.tableName
                ][action.payload.id]
            },
            prepare: ({ id, tableName }) => {
                return { payload: { id, tableName } }
            },
        },
        toggleAll: {
            reducer: (state, action) => {
                const newState = Object.keys(
                    state[action.payload.tableName]
                ).reduce(
                    (carry, id) => ({
                        ...carry,
                        [id]: !state[action.payload.tableName][id],
                    }),
                    {}
                )
                state[action.payload.tableName] = newState
            },
            prepare: ({ id, tableName }) => {
                return { payload: { id, tableName } }
            },
        },
    },
})

export const { initTable, toggleRow, toggleAll } = selectorSlice.actions

export default selectorSlice.reducer
