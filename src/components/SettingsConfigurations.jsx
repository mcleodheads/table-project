import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useTable, useResizeColumns, useFlexLayout} from "react-table";
import {Divider, Icon, Loader, Popup, Table} from "semantic-ui-react";

import ModalFields from "./ModalFields";
import FilterColumnTooltip from "./FilterColumnTooltip";
import {getPopupData} from "../store/reducers/configurationReducer";

const SettingsConfigurations = () => {
    const [openModal, setModalOpen] = useState(false);
    const [activeCell, setActiveCell] = useState([]);
    const [activeRow, setActiveRow] = useState({cells: []});
    const configuration = useSelector(state => state.configReducer);
    const dispatch = useDispatch()
    const {t} = useTranslation();

    useEffect(() => {
        const config = {filter: {},}
        dispatch(getPopupData([configuration.chosenConfig[0].name, config]))
    }, [configuration.chosenConfig[0].name])

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
            minWidth: Math.round(window.innerWidth * (10 / 100)),
            width: Math.round(window.innerWidth * (15 / 100)),
            maxWidth: Math.round(window.innerWidth * (25 / 100)),
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
        setModalOpen(true)
    }

    if (configuration.isLoading) {
        return <Loader>{`${t('data_loading')}`}</Loader>
    }

    return (
        <div style={{marginTop: '8rem', width: 'fit-content'}}>
            <Table
                selectable
                // fixed
                // singleLine
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
                                                <Popup
                                                    content={<FilterColumnTooltip row={rows} column={col}/>}
                                                    pinned
                                                    on={'click'}
                                                    position={'bottom center'}
                                                    trigger={<Icon
                                                        style={{cursor: 'pointer'}}
                                                        name={'filter'}
                                                    />}
                                                />
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
                        rows
                            .filter(row => configuration.filteredItems.data.includes(row.original.id))
                            .map(row => {
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
            <ModalFields row={activeRow} cell={activeCell} setOpen={setModalOpen} open={openModal}/>
        </div>
    );
};

export default SettingsConfigurations;