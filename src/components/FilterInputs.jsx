import React from 'react';
import {Checkbox, Form, Input, Loader, Segment} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const FilterInputs = ({type, setValue, value, column}) => {
    const configuration = useSelector(state => state.configReducer)
    const {t} = useTranslation()

    switch (type) {
        case 'Date':
            return <Input
                onChange={setValue}
                value={value}
                placeholder={`dd.mm.yyyy`}
            />

        case 'Number':
        case 'Integer':
            return <Input
                type={'number'}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder={column.Header}
            />

        case 'Select':
        case 'Enum':
        case 'MultiSelect':
            return (
                <Form>
                    {
                        configuration.filteredItems.selectorsIsLoading ? (
                            <Segment className={'filter-stub'}>
                                <Loader active>
                                    {t('data_loading')}
                                </Loader>
                            </Segment>
                        ) : configuration.filteredItems.selectorFields.map(field => (
                            <Form.Field key={field.name}>
                                <Checkbox
                                    checked={value === field.value}
                                    radio={type !== `MultiSelect`}
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

        case 'Boolean':
            return <Checkbox
                toggle
                checked={value}
                onChange={() => setValue(!value)}
            />

    }
    return <Input
        type={'text'}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={column.Header}
    />
};

export default FilterInputs;
