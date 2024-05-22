import React from "react";
import Group from "./Group/Group";
import { useSelector } from 'react-redux';
import useStyles from "./styles"
import { CircularProgress, Grid } from "@material-ui/core";

const Groups = ({ setCurrentId }) => {
    const { groups, isLoading } = useSelector((state) => state.groups);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    if (!groups || (!groups.length && !isLoading)) return 'No groups';

    if (!user){
        return (
          "Ulogujte se da biste videli grupe"
        )
    }
    
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {groups.map( (group) => ((group.clanovi.filter((clan) => clan === user.result._id).length && (group.administratori_grupe.filter((clan) => clan === user.result._id).length) ?
                    <Grid key={group._id} item lg={6} md={12}>
                        <Group group={group} />
                    </Grid>
                    : "Niste clan grupe"
                )))}
            </Grid>
        )
    )
}

export default Groups;