import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, Dimmer, Dropdown, Grid, Input, Loader, Modal} from "semantic-ui-react";

import {getModalData} from "../store/reducers/configurationReducer";
import ModalInputs from "./ModalInputs";

const ModalFields = ({setOpen, open, cell, row}) => {
    const {t} = useTranslation()
    const configuration = useSelector(state => state.configReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (open) {
            dispatch(getModalData([configuration.chosenConfig[0].name, cell.row.original.id]))
        }
    }, [open])

    if (configuration.isLoading) {
        return (
            <Dimmer active inverted>
                <Loader inverted/>
            </Dimmer>
        )
    }

    return (
        <Modal
            size={'large'}
            open={open}
            onClose={() => setOpen(false)}
            dimmer={'blurring'}>
            <Modal.Content>
                <Grid celled>
                    <Grid.Row columns={3}>
                        {
                            row.cells.map(cell => {
                                return (
                                    <Grid.Column key={cell.column.Header}>
                                            <Grid>
                                                <Grid.Row columns={2}>
                                                    <Grid.Column floated={'left'} width={6}>
                                                        {cell.column.Header}
                                                    </Grid.Column>
                                                    <Grid.Column floated={'right'} textAlign={'right'} width={10}>
                                                        <ModalInputs type={cell.column.type} cell={cell} />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                    </Grid.Column>
                                )
                            })
                        }
                    </Grid.Row>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={() => setOpen(false)}
                    content={`${t(`CancelButton`)}`}
                    secondary/>
                <Button
                    content={`${t(`SaveButton`)}`}
                    positive/>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalFields;
