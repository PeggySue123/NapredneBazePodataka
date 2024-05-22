import React from "react";
import UserBook from "./UsersBook/UsersBook";
import { useSelector } from 'react-redux';
import useStyles from "./styles"
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const UserBooks = () => {
  const { usersBooks, isLoading } = useSelector((state) => state.usersBooks);
  const classes = useStyles();

  if (!usersBooks || (!usersBooks.length && !isLoading)) return <Typography variant="h3" component="h2">Nema korisnickih knjiga</Typography>;

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container className={classes.usersBooksContainer}>
        <Grid item xs={12}>
          <Typography variant="h6">Knjige korisnika</Typography>
        </Grid>
        <Grid className={classes.container} container item xs={12} alignItems="stretch" spacing={3}>
          {usersBooks.map((usersBook) => (
            <Grid item xs={12}>
              <UserBook book={usersBook} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  );
};

export default UserBooks;