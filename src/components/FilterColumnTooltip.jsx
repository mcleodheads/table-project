import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Item} from "semantic-ui-react";

import {getPopupData, getSelectorsData} from "../store/reducers/configurationReducer";
import FilterInputs from "./FilterInputs";

const FilterColumnTooltip = ({column, row}) => {
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


// <Item>
//     {
//         fieldType === `Text` ? (
//             <FilterInputs
//                 type={'text'}
//                 setValue={setValue}
//                 value={value}
//                 placeholder={column.Header}
//             />
//         ) : fieldType === `Number` || fieldType === `Integer` ? (
//             <FilterInputs
//                 type={'number'}
//                 setValue={setValue}
//                 value={value}
//                 placeholder={column.Header}
//             />
//         ) : fieldType === `Select` || fieldType === `Enum` || fieldType === `MultiSelect` ?
//             configuration.filteredItems.selectorsIsLoading ?
//                 (
//                     <Segment style={{width: '100px', height: 100}}>
//                         <Loader active>
//                             {t('data_loading')}
//                         </Loader>
//                     </Segment>
//                 ) :
//                 (
//                     <Form>
//                         {
//                             configuration.filteredItems.selectorFields.map(field => (
//                                 <Form.Field key={field.name}>
//                                     <FilterInputs
//                                         type={fieldType}
//                                     />
//                                 </Form.Field>
//                             ))
//                         }
//                     </Form>
//                 )
//             : fieldType === `Boolean` ? (
//                 <FilterInputs
//                     toggle
//                     checked={value}
//                     onChange={() => setValue(!value)}
//                 />
//             ) : <FilterInputs
//                 type={fieldType}
//                 setValue={setValue}
//                 value={value}
//                 placeholder={`dd.mm.yyyy`}
//             />
//     }
// </Item>


// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {Form, Item, Loader, Segment} from "semantic-ui-react";
// import {useTranslation} from "react-i18next";
//
// import {getPopupData, getSelectorsData} from "../store/reducers/configurationReducer";
// import FilterInputs from "./FilterInputs";
//
// const FilterColumnTooltip = ({column, row}) => {
//     const [value, setValue] = useState('')
//     const configuration = useSelector(state => state.configReducer)
//     const dispatch = useDispatch()
//     const {t} = useTranslation()
//     const fieldType = column.type
//     useEffect(() => {
//         const {id} = column
//         const config = {
//             filter: {[id]: value,},
//         }
//         dispatch(getPopupData([configuration.chosenConfig[0].name, config]))
//     }, [value])
//
//     useEffect(() => {
//         const {id} = column
//         dispatch(getSelectorsData([configuration.chosenConfig[0].name, id]))
//     }, [])
//
//     if (fieldType !== 'Select' || fieldType !== 'MultiSelect' || fieldType !== 'Enum') {
//         return (
//             <Item>
//                 <Form>
//                     <Form.Field>
//                         <FilterInputs
//                             type={fieldType}
//                             setValue={setValue}
//                             value={value}
//                             column={column}
//                         />
//                     </Form.Field>
//                 </Form>
//             </Item>
//         )
//     }
//
//     return (
//         <Item>
//             {
//                 configuration.filteredItems.selectorsIsLoading ?
//                     (
//                         <Segment style={{width: '100px', height: 100}}>
//                             <Loader active>
//                                 {t('data_loading')}
//                             </Loader>
//                         </Segment>
//                     ) :
//                     (
//                         <Form>
//                             {
//                                 configuration.filteredItems.selectorFields.map(field => {
//                                     console.log(field)
//                                     return (
//                                         <Form.Field key={field.name}>
//                                             <FilterInputs
//                                                 type={fieldType}
//                                                 setValue={setValue}
//                                                 value={value}
//                                                 column={column}
//                                                 field={field}
//                                             />
//                                         </Form.Field>
//                                     )
//                                 })
//                             }
//                         </Form>
//                     )
//             }
//         </Item>
//     );
// };
//
// export default FilterColumnTooltip;
