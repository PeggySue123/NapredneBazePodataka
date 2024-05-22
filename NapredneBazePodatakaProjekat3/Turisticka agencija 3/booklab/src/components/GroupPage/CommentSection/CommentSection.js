import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentGroup } from "../../../actions/groups";
import useStyles from "./styles";

const CommentSection = ({ group }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(group.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  if (!comments) {
    return (
      <Typography variant="h3" component="h2">
        Nema komentara za prikaz
      </Typography>
    );
  }
  const handleComment = async () => {
    dispatch(commentGroup(`${user.result.ime}: ${comment}`, group._id));

    group.comments.push(`${user.result.ime}: ${comment}`);
    setComments(group.comments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Grid container>
      <Grid item sm={12} md={8} className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">
          Poruke
        </Typography>
        {group.comments.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </Grid>
      <Grid item sm={12} md={4}>
        <Typography gutterBottom variant="h6">
          Napisi poruku
        </Typography>
        <TextField
          fullWidth
          rows={1}
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
    </Grid>
  );
};

export default CommentSection;
