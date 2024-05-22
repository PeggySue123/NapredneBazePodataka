import React from "react";
import UserBook from "./UserBook/UserBook";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { CircularProgress, Grid, Typography, Paper } from "@material-ui/core";

const UserBooks = ({ setCurrentId }) => {
  const { usersBooks, isLoading } = useSelector((state) => state.usersBooks);
  const classes = useStyles();

  if (!usersBooks || (!usersBooks.length && !isLoading))
    return (
      <Typography variant="h3" component="h2">
        Nema knjiga korisnika
      </Typography>
    );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Paper className={classes.paper} elevation={6}>
      <Grid container className={classes.usersBooksContainer}>
        <Grid item xs={12}>
          <Typography variant="h6">Knjige za zamenu</Typography>
        </Grid>
        <Grid
          className={classes.container}
          container
          item
          xs={12}
          alignItems="stretch"
          spacing={3}
        >
          {usersBooks.map((usersBook) => (
            <Grid key={usersBook._id} item xs={12}>
              <UserBook book={usersBook} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserBooks;
