import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Item} from "semantic-ui-react";

import {getPopupData, getSelectorsData} from "../store/reducers/configurationReducer";
import FilterInputs from "./FilterInputs";

const FilterColumnTooltip = ({column}) => {
    const [value, setValue] = useState('')
    const configuration = useSelector(state => state.configReducer)
    const dispatch = useDispatch()
    const fieldType = column.type
    useEffect(() => {
        const {id} = column
        const config = {
            filter: {[id]: value,},
        }
        dispatch(getPopupData([configuration.chosenConfig[0].name, config]))
    }, [value])

    useEffect(() => {
        const {id} = column
        dispatch(getSelectorsData([configuration.chosenConfig[0].name, id]))
    }, [])

    return (
        <Item>
            <FilterInputs
                type={fieldType}
                value={value}
                setValue={setValue}
                column={column}
            />
        </Item>
    );
};
export default FilterColumnTooltip;
