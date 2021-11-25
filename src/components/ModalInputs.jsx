import React from 'react';
import {Checkbox, Dropdown, Input} from "semantic-ui-react";

const ModalInputs = ({type, cell}) => {
    switch (type) {
        case 'Boolean':
            return <Checkbox defaultChecked={cell.value} toggle/>
        case 'Number' || 'Integer':
            return <Input type={'number'} placeholder={`${cell.value}`}/>
        case 'Select' || 'Enum':
            return <Dropdown
                options={[{value: '1', key: '1', text: '1'}]}
                selection
                placeholder={cell.value?.name ? (
                    `${cell.value?.name}`
                ) : null}
            />
        case 'MultiSelect':
            return <Dropdown
                multiple
                options={[{value: '1', key: '1', text: '1'}]}
                selection
                placeholder={cell.value?.name ? (
                    `${cell.value?.name}`
                ) : null}
            />
    }
    return <Input placeholder={`${cell.value}`}/>
};

export default ModalInputs;
