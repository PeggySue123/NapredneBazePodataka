import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";

import { getBook } from "../../../actions/books";
import useStyles from "./styles";
import CommentSection from "../CommentSection/CommentSection";

const Book = () => {
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBook(id));
  }, [id]);

  const { book, isLoading } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!book && isLoading) return <CircularProgress size="7em" />;

  if (!book)
    return (
      <Typography variant="h3" component="h2">
        Nema knjige u bazi
      </Typography>
    );

  return isLoading ? (
    <CircularProgress size="7em" />
  ) : (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {book.ime_knjige}
          </Typography>
          <Typography variant="h6">{book.autor_knjige}</Typography>
          <Typography gutterBottom variant="body1" component="p">
            {book.opis}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {book.zanr.map((zanr) => `#${zanr} `)}
          </Typography>
          <Typography variant="body1">
            <StarIcon />
            <strong>{book.rejting}</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection book={book} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              book.slika ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={book.ime_knjige}
          />
        </div>
      </div>
    </Paper>
  );
};
export default Book;
