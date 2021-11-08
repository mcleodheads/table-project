import React from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {Button, Checkbox, Form, Input, List, Loader, Segment, Select} from "semantic-ui-react";


const SettingsConfigurations = () => {
    const configuration = useSelector(state => state.configReducer)
    const {t} = useTranslation()
    console.log(configuration)

    if (configuration.isLoading) {
        return <Loader>{`${t('data_loading')}`}</Loader>
    }

    return (
        <Segment>
            <List>
                {configuration.chosenConfig.map(setting => (
                    <List.Item key={setting.name}>
                        <List.Header>
                            {`${t(setting.name)}`}
                        </List.Header>
                        <Form>
                            {setting.columns.map(item => (
                                <Form.Field key={item.displayNameKey}>
                                    {t(item.displayNameKey)}
                                    {
                                        item.isRequired ? (
                                            <span style={{fontSize: '20px', color: 'red'}}>*</span>
                                        ) : null}
                                    {
                                        item.type === 'Boolean' ? (
                                            <List.Item>
                                                <Checkbox toggle/>
                                            </List.Item>
                                        ) : (
                                            item.type === 'Select' ? (
                                                <List.Item>
                                                    <Select fluid />
                                                </List.Item>
                                            ) : (
                                                <List.Item>
                                                    <Input fluid placeholder={t(item.placeholderKey)} type={item.type}/>
                                                </List.Item>
                                            )
                                        )
                                    }
                                </Form.Field>
                            ))}
                        </Form>
                        <Button style={{marginTop: '1rem', minWidth: '150px'}} floated={'right'} positive
                                content={`${t(`SaveButton`)}`}/>
                    </List.Item>
                ))}
            </List>
        </Segment>
    );
};

export default SettingsConfigurations;