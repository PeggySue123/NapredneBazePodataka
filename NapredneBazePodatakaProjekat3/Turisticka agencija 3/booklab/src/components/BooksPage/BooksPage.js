import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
  Container,
  Grow,
  Grid,
  AppBar,
  Button,
  Paper,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import Pagination from "./Pagination/Pagination";

import Books from "./books/Books";
import BookForm from "./DodavanjeKnjige/AddBookForm";
import { getBooksBySearch } from "../../actions/books";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const BooksPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [genres, setGenres] = useState([]);
  const history = useHistory();

  const searchBook = () => {
    if (genres) {
      dispatch(getBooksBySearch({ genres: genres.join(",") }));
      history.push(`/books/search?genres=${genres.join(",")}`);
    } else {
      history.push("/books");
    }
  };

  const handleAddChip = (genre) => setGenres([...genres, genre]);

  const handleDeleteChip = (chipToDelete) =>
    setGenres(genres.filter((genre) => genre !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container>
          <Grid item xs={12} sm={6} md={3} className={classes.item1}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <ChipInput
                style={{ margin: "10px 0" }}
                value={genres}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Pretrazi zanrove"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                onClick={searchBook}
                variant="contained"
                color="primary"
              >
                Pretrazi
              </Button>
            </AppBar>
          </Grid>
          <Grid item xs={12} md={6} className={classes.item2}>
            <Books setCurrentId={setCurrentId} />
            {!genres.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
          {user && user.result.admin_stranice && (
            <Grid item xs={12} sm={6} md={3} className={classes.item3}>
              <BookForm currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};
export default BooksPage;
