import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {Button, Checkbox, Divider, Input, Item, Loader, Segment, Select, Table} from "semantic-ui-react";
import {useTable, useResizeColumns} from "react-table";
import {useFlexLayout} from "react-table/src/plugin-hooks/useFlexLayout";

const SettingsConfigurations = () => {
    const configuration = useSelector(state => state.configReducer);
    const {t} = useTranslation();

    const columns = useMemo(() => [
        {
            Header: `${t(configuration.chosenConfig[0].name)}`,
            accessor: 'subheader'
        },
        {
            Header: `${t('Permission.FieldsSettings')}`,
            accessor: 'inputType'
        }
    ], [configuration, `${t('Permission.FieldsSettings')}`])

    const data = useMemo(() => configuration.chosenConfig[0].columns.map(item => ({
        subheader: {
            subheader: `${t(item.name)}`,
            required: item.isRequired,
        },
        inputType: item.type,
        required: item.isRequired,
        accessor: item.displayNameKey
    })), [configuration, `${t('Permission.FieldsSettings')}`])

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: Math.round(window.innerWidth * (20 / 100)),
            width: Math.round(window.innerWidth * (49 / 100)),
            maxWidth: Math.round(window.innerWidth * (49 / 100)),
        }),
        []
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
            defaultColumn
        },
        useResizeColumns,
        useFlexLayout
    );

    if (configuration.isLoading) {
        return <Loader>{`${t('data_loading')}`}</Loader>
    }


    return (
        <Segment>
            {configuration.chosenConfig.map(setting => (
                <Table
                    compact
                    basic
                    celled
                    key={setting.name}
                    {...getTableProps()}>
                    <Table.Header
                        style={{userSelect: 'none',}}
                    >
                        {
                            headerGroups.map(headerGroup => (
                                <Table.Row {...headerGroup.getHeaderGroupProps()}>
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
                                                        }}
                                                    />
                                                </Table.HeaderCell>
                                            )
                                        })
                                    }
                                </Table.Row>
                            ))
                        }
                    </Table.Header>
                    <Table.Body  {...getTableBodyProps()}>
                        {
                            rows.map(row => {
                                prepareRow(row)
                                return (
                                    <Table.Row style={{width: '100%'}} {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <Table.Cell {...cell.getCellProps()}>
                                                        {
                                                            cell.getCellProps().key.includes('inputType') ? (
                                                                cell.value === 'Boolean' ? (
                                                                    <Segment compact floated={'right'}>
                                                                        <Checkbox toggle/>
                                                                    </Segment>
                                                                ) : (
                                                                    cell.value === 'Select' ? (
                                                                        <Select fluid/>
                                                                    ) : (
                                                                        cell.value === 'Enum' ? (
                                                                            <Input fluid type={'number'}/>
                                                                        ) : (
                                                                            <Input fluid type={cell.value}/>
                                                                        )
                                                                    )
                                                                )
                                                            ) : (
                                                                <Item>
                                                                    {
                                                                        cell.value.required ? (
                                                                            <>
                                                                                {
                                                                                    cell.value.subheader
                                                                                }
                                                                                <span
                                                                                    style={{
                                                                                        fontSize: 22,
                                                                                        color: 'red'
                                                                                    }}>
                                                                                    *
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {
                                                                                    cell.value.subheader
                                                                                }
                                                                            </>
                                                                        )
                                                                    }
                                                                </Item>
                                                            )
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
            ))}
            <Button.Group style={{marginTop: '2rem'}} floated={'right'}>
                <Button
                    style={{minWidth: '150px'}}
                    content={`${t(`CancelButton`)}`}
                    secondary/>
                <Button.Or/>
                <Button
                    style={{minWidth: '150px'}}
                    content={`${t(`SaveButton`)}`}
                    positive/>
            </Button.Group>
        </Segment>
    );
};

export default SettingsConfigurations;