import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Form, Input, Item, Loader, Segment} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

import {getPopupData, getSelectorsData} from "../store/reducers/configurationReducer";

const FilterColumnTooltip = ({column, row}) => {
    const [value, setValue] = useState('')
    const configuration = useSelector(state => state.configReducer)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const fieldType = column.type

    useEffect(() => {
        const {id} = column
        const config = {
            filter: {
                [id]: value,
            },
            skip: 0,
            take: 0,
            sort: {}
        }
        dispatch(getPopupData([configuration.chosenConfig[0].name, config]))
    }, [value])

    useEffect(() => {
        const {id} = column
        dispatch(getSelectorsData([configuration.chosenConfig[0].name, id]))
    }, [])

    return (
        <Item>
            {
                fieldType === `Text` ? (
                    <Input
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        placeholder={column.Header}
                    />
                ) : fieldType === `Number` || fieldType === `Integer` ? (
                    <Input
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        placeholder={column.Header}
                    />
                ) : fieldType === `Select` || fieldType === `Enum` || fieldType === `MultiSelect` ?
                    configuration.filteredItems.selectorsIsLoading ?
                        (
                            <Segment style={{width: '100px', height: 100}}>
                                <Loader active>
                                    {t('data_loading')}
                                </Loader>
                            </Segment>
                        ) :
                        (
                            <Form>
                                {
                                    configuration.filteredItems.selectorFields.map(field => (
                                        <Form.Field key={field.name}>
                                            <Checkbox
                                                checked={value === field.value}
                                                radio={fieldType !== `MultiSelect`}
                                                value={field.name}
                                                name={'checkboxRadioGroup'}
                                                label={field.name}
                                                onChange={() => setValue(field.value)}
                                            />
                                        </Form.Field>
                                    ))
                                }
                            </Form>
                        )
                    : fieldType === `Boolean` ? (
                        <Checkbox
                            toggle
                            checked={value}
                            onChange={() => setValue(!value)}
                        />
                    ) : <Input
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        placeholder={`dd.mm.yyyy`}
                    />
            }
        </Item>
    );
};

export default FilterColumnTooltip;