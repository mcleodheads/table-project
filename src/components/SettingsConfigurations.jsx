import React from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {Button, Checkbox, Input, Loader, Ref, Segment, Select, Table} from "semantic-ui-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const SettingsConfigurations = () => {
    const configuration = useSelector(state => state.configReducer)
    const {t} = useTranslation()
    console.log(configuration)

    const onDragEnd = result => {

    }

    if (configuration.isLoading) {
        return <Loader>{`${t('data_loading')}`}</Loader>
    }

    return (
        <Segment>
            {configuration.chosenConfig.map(setting => (
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    <Table celled key={setting.name}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={4}>
                                    {`${t(setting.name)}`}
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    {`${t('Permission.FieldsSettings')}`}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Droppable droppableId={'droppable'}>
                            {
                                provided => (
                                    <Ref innerRef={provided.innerRef}>
                                        <Table.Body>
                                            {setting.columns.map((item, index) => (
                                                <Draggable
                                                    index={index}
                                                    draggableId={item.displayNameKey}
                                                    key={item.displayNameKey}
                                                >
                                                    {
                                                        provided => (
                                                            <Ref innerRef={provided.innerRef}>
                                                                <Table.Row
                                                                    key={item.displayNameKey}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <Table.Cell>
                                                                        {t(item.displayNameKey)}
                                                                        {
                                                                            item.isRequired ? (
                                                                                <span style={{fontSize: '20px', color: 'red'}}> *</span>
                                                                            ) : null
                                                                        }
                                                                    </Table.Cell>
                                                                    {
                                                                        item.type === 'Boolean' ? (
                                                                            <Table.Cell style={{marginTop: '1rem'}}>
                                                                                <Checkbox toggle/>
                                                                            </Table.Cell>
                                                                        ) : (
                                                                            item.type === 'Select' ? (
                                                                                <Table.Cell>
                                                                                    <Select
                                                                                        options={[{key: '1', value: '1', text: '1',}, {
                                                                                            key: '2',
                                                                                            value: '2',
                                                                                            text: '2',
                                                                                        },]} fluid/>
                                                                                </Table.Cell>
                                                                            ) : (
                                                                                <Table.Cell>
                                                                                    <Input fluid type={item.type}/>
                                                                                </Table.Cell>
                                                                            )
                                                                        )
                                                                    }
                                                                </Table.Row>
                                                            </Ref>
                                                        )
                                                    }
                                                </Draggable>

                                            ))}
                                        </Table.Body>
                                    </Ref>
                                )
                            }
                        </Droppable>
                    </Table>
                </DragDropContext>
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