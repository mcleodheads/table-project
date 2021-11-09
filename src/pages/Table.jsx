import React from 'react';
import {useSelector} from "react-redux";

import TableComponent from "../components/TableComponent";
import SettingsConfigurations from "../components/SettingsConfigurations";

import {Grid, Segment} from "semantic-ui-react";

const Table = () => {
    const {chosenConfig} = useSelector(state => state.configReducer)

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Segment textAlign={'right'}>
                        <TableComponent/>
                    </Segment>
                    {
                        chosenConfig.length === 0 ? null : <SettingsConfigurations/>
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Table;