import React from 'react';
import {useSelector} from "react-redux";
import {Grid} from "semantic-ui-react";

import TableComponent from "../components/TableComponent";
import SettingsConfigurations from "../components/SettingsConfigurations";

const Table = () => {
    const {chosenConfig} = useSelector(state => state.configReducer)
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <TableComponent/>
                    {
                        chosenConfig.length === 0 ? null : <SettingsConfigurations />
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Table;