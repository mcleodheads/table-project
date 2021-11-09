import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {getConfig, setChosenField} from "../store/reducers/configurationReducer";

import {Button, Dimmer, Dropdown, Icon, Loader, Table} from "semantic-ui-react";

const TableComponent = () => {
    const dispatch = useDispatch()
    const configuration = useSelector(state => state.configReducer)
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getConfig())
    }, [])


    if (configuration.isLoading) {
        return (
            <Dimmer active inverted>
                <Loader>{`${t('data_loading')}`}...</Loader>
            </Dimmer>
        )
    }
    return (
        <Dropdown
            floating
            labeled
            button
            className={'icon'}
            closeOnBlur
            trigger={(<span>{t('Permission.FieldsSettings')} <Icon name={'filter'} /></span>)}
            scrolling
            >
            <Dropdown.Menu>
                {
                    configuration.config.map(header => (
                        <Dropdown.Item
                            onClick={() => dispatch(setChosenField(header))}
                            text={`${t(header.name)}`}
                            key={header.name}
                            value={`${t(header.name)}`}
                        />
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )


};

export default TableComponent;


// const handleGetCol = (e, data) => {
//     const {value} = data
//     setHeaders(value)
// }
//
// const onDragEnd = (result) => {
//     const {destination, source, draggableId} = result
//     if (!destination) {
//         return
//     }
//     if (
//         destination.droppableId === source.droppableId &&
//         destination.index === source.index
//     ) {
//         return;
//     }
//     const colHeader = headers[source.index]
//     setHeaders(prev => {
//         prev.splice(source.index, 1)
//         prev.splice(destination.index, 0, colHeader)
//         return prev
//     })
// }
// <Segment>
//     <Dropdown
//         placeholder='Columns'
//         fluid
//         multiple
//         selection
//         options={config.tableHeaders}
//         onChange={(e, data) => handleGetCol(e, data)}
//     />
//     <DragDropContext onDragStart={() => setBlur(true)} onDragEnd={result => onDragEnd(result)}>
//         <Table compact singleLine>
//             <Table.Header>
//                 <Droppable droppableId={'droppable'} direction={'horizontal'}>
//                     {
//                         provided => (
//                             <Ref innerRef={provided.innerRef}>
//                                 <Table.Row>
//                                     {
//                                         headers.map((header, index) => {
//                                             return config.tableHeaders
//                                                 .filter(headerValue => headerValue.value === header)
//                                                 .map((item) => (
//                                                     <Draggable
//                                                         index={index}
//                                                         draggableId={item.key}
//                                                         key={item.key}>
//                                                         {
//                                                             provided => (
//                                                                 <Ref innerRef={provided.innerRef}>
//                                                                     <Table.HeaderCell
//                                                                         width={4}
//                                                                         {...provided.draggableProps}
//                                                                         {...provided.dragHandleProps}
//                                                                         key={item.key}>
//                                                                         {item.value}
//                                                                     </Table.HeaderCell>
//                                                                 </Ref>
//                                                             )
//                                                         }
//                                                     </Draggable>
//                                                 ))
//                                         })
//                                     }
//                                     {provided.placeholder}
//                                 </Table.Row>
//                             </Ref>
//                         )
//                     }
//                 </Droppable>
//             </Table.Header>
//             <Table.Body>
//                 {
//                     isBlur ? (
//                         <Table.Row/>
//                     ) : (
//                         <>
//                             {
//                                 config.tableData.map(data => {
//                                     return (
//                                         <Table.Row key={data.id}>
//                                             {
//                                                 headers.map(keys => {
//                                                     const key = config.tableHeaders
//                                                         .filter(k => k.value === keys)
//                                                         .map(item => item)
//                                                     return (
//                                                         <Table.Cell key={key.key}>
//                                                             {data[key[0].key]}
//                                                         </Table.Cell>
//                                                     )
//                                                 })
//                                             }
//                                         </Table.Row>
//                                     )
//                                 })
//                             }
//                         </>
//                     )
//                 }
//
//             </Table.Body>
//         </Table>
//
//     </DragDropContext>
// </Segment>