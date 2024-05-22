import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";

const UserBook = (userBook) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">{userBook.book.autor_knjige}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{userBook.book.ime_knjige}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{userBook.book.zanr.map((zanr) => `#${zanr} `)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserBook;