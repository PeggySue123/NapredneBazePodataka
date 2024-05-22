import React from "react";
import Book from "./book/Book";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const Books = ({ setCurrentId }) => {
  const { books, isLoading } = useSelector((state) => state.books);
  const classes = useStyles();

  if (!books.length && !isLoading) return <Typography variant="h3" component="h2">Nema knjiga</Typography>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {books.map((book) => (
        <Grid key={book._id} item xs={12} sm={6}>
          <Book book={book} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Books;
