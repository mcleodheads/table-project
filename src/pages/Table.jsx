import React from 'react';
import {Grid, Segment} from "semantic-ui-react";
import {useSelector} from "react-redux";

import TableComponent from "../components/TableComponent";
import SettingsConfigurations from "../components/SettingsConfigurations";

const Table = () => {
    const {chosenConfig} = useSelector(state => state.configReducer)
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Segment>
                        <TableComponent/>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={11}>
                        {
                            chosenConfig.length === 0 ? null : <SettingsConfigurations/>
                        }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Table;