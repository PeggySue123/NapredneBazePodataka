import React from "react";
import { useSelector } from 'react-redux';
import User from "./User/User";
import { Typography, CircularProgress, Grid } from "@material-ui/core";
import useStyles from './styles';

const UsersList = ({ setCurrentId }) => {
    const { users, isLoading } = useSelector((state) => state.auth);
    const classes = useStyles();

    console.log(users);
  
    if (!users || (!users.length && !isLoading)) return 'No users';
  
    return (
      isLoading ? <CircularProgress /> : (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary">Korisnici</Typography>
          </Grid>
          <Grid container item xs={12} alignItems="stretch" spacing={3}>
            {users.map((user) => (
              <Grid key={user._id} item lg={6} md={12}>
                <User user={user} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )
    );
  };
  
  export default UsersList;