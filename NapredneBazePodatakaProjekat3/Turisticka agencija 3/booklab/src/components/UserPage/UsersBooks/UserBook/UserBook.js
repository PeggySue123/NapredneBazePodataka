import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Grid, Typography, Paper } from "@material-ui/core";
import { useDispatch } from 'react-redux';

import useStyles from "./styles";
import { deleteUsersBook } from "../../../../actions/usersBooks";

const UserBook = (userBook, setCurrentId) => {
  const dispatch = useDispatch();
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
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <Button size="small" color="secondary" onClick={() => dispatch(deleteUsersBook(userBook.book._id))}>
              <DeleteIcon fontSize="small" /> &nbsp; Obrisi
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserBook;
