import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentBook } from "../../../actions/books";
import useStyles from "./styles";

const CommentSection = ({ book }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(book.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  if (!comments) {
    return <Typography variant="h3" component="h2">Nema komentara za prikaz</Typography>;
  }
  const handleComment = async () => {
    dispatch(commentBook(`${user.result.ime}: ${comment}`, book._id));

    setComments(book.comments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6} className={classes.item1}>
        <Typography gutterBottom variant="h6">
          Napisi komentar
        </Typography>
        <TextField
          fullWidth
          rows={4}
          variant="outlined"
          label="Poruka"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <Button
          style={{ marginTop: "10px" }}
          fullWidth
          disabled={!comment.length}
          color="primary"
          variant="contained"
          onClick={handleComment}
        >
          Posalji
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.item2}>
        <Typography gutterBottom variant="h6">
          Korisnicki komentari
        </Typography>
        {book.comments.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </Grid>
    </Grid>
  );
};

export default CommentSection;
