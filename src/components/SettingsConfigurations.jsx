import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useTable, useResizeColumns, useFlexLayout} from "react-table";
import axios from "axios";

import ModalFields from "./ModalFields";

import {
    Divider, Icon,
    Loader, Segment,
    Table
} from "semantic-ui-react";

const SettingsConfigurations = () => {
    const [open, setOpen] = useState(false)
    const [activeCell, setActiveCell] = useState([])
    const [activeRow, setActiveRow] = useState({cells: []})
    const configuration = useSelector(state => state.configReducer);
    const {t} = useTranslation();

    const columns = useMemo(() => configuration.chosenConfig[0].columns.map(item => {
        return {
            Header: `${t(item.name)}`,
            accessor: item.name,
            type: item.type,
        }
    }), [configuration, `${t('Permission.FieldsSettings')}`])

    const data = useMemo(() => {
        return configuration.searchingResults
    }, [configuration.searchingResults, `${t('Permission.FieldsSettings')}`])

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: Math.round(window.innerWidth * (1 / 100)),
            width: Math.round(window.innerWidth * (10 / 100)),
            maxWidth: Math.round(window.innerWidth * (10 / 100)),
        }), []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useResizeColumns,
        useFlexLayout
    );

    const handleModalOpen = (cell, row) => {
        setActiveRow(row)
        setActiveCell(cell)
        setOpen(true)
    }

    if (configuration.isLoading) {
        return <Loader>{`${t('data_loading')}`}</Loader>
    }

    return (
        <div style={{marginTop: '8rem', zIndex: 2}}>
            <Table
                selectable
                fixed
                singleLine
                celled
                {...getTableProps()}>
                <Table.Header
                    style={{userSelect: 'none'}}>
                    {
                        headerGroups.map(headerGroup => (
                            <Table.Row
                                {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(col => {
                                        return (
                                            <Table.HeaderCell
                                                {...col.getHeaderProps()}>
                                                {col.render('Header')}
                                                <Divider
                                                    {...col.getResizerProps()}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: 10,
                                                        marginTop: -1,
                                                        height: '100%',
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 0,
                                                        transform: 'translateX(50%)',
                                                        zIndex: 1,
                                                        touchAction: 'none',
                                                        cursor: 'col-resize'
                                                    }}/>
                                            </Table.HeaderCell>
                                        )
                                    })
                                }
                            </Table.Row>
                        ))
                    }
                </Table.Header>
                <Table.Body
                    style={{userSelect: 'none'}}
                    {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <Table.Row
                                    {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <Table.Cell
                                                    onClick={() => handleModalOpen(cell, row)}
                                                    textAlign={"center"}
                                                    {...cell.getCellProps()}>
                                                    {
                                                        cell.value !== null ?
                                                            cell.value?.name !== undefined ?
                                                                `${t(cell.value?.name)}` :
                                                                `${Array.isArray(cell.value) ?
                                                                    (cell.value.map(item => item.name)) :
                                                                    ((`${t(cell.value)}`))}` :
                                                            `${t('emptyValue')}`
                                                    }
                                                </Table.Cell>
                                            )
                                        })
                                    }
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            <ModalFields row={activeRow} cell={activeCell} setOpen={setOpen} open={open}/>
        </div>
    );
};

export default SettingsConfigurations;