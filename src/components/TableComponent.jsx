import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Dimmer, Dropdown, Icon, Loader} from "semantic-ui-react";

import {getConfig, getSearchResults, setChosenField} from "../store/reducers/configurationReducer";

const TableComponent = () => {
    const dispatch = useDispatch()
    const configuration = useSelector(state => state.configReducer)
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getConfig())
    }, [])

    const onChangeHandler = (header) => {
        dispatch(getSearchResults(header))
        dispatch(setChosenField(header))
    }

    if (configuration.isLoading) {
        return (
            <Dimmer active inverted>
                <Loader>{`${t('data_loading')}`}...</Loader>
            </Dimmer>
        )
    }

    return (
        <div className={'dropdown-wrapper'}>
            <Dropdown
                labeled
                button
                className={'icon'}
                closeOnBlur
                trigger={(<span>
                {
                    configuration.chosenConfig.length !== 0 ?
                        t(configuration.chosenConfig[0].name) :
                        t('Permission.FieldsSettings')
                }
                    &nbsp;<Icon name={'filter'}/></span>)}
                scrolling>
                <Dropdown.Menu>
                    {
                        configuration.config.map(header => (
                            <Dropdown.Item
                                onClick={() => onChangeHandler(header)}
                                text={`${t(header.name)}`}
                                key={header.name}
                                value={`${t(header.name)}`}
                            />
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )


};

export default TableComponent;
