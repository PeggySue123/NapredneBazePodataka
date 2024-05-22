import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";

import Book from "./Book/Book";
import useStyles from "./styles";

const BookPage = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12}>
            <Book />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default BookPage;
