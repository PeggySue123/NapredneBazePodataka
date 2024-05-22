import React from "react";
import { Card, CardActions, Button, Typography, Grid } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { deleteReview } from '../../../../actions/reviews';
import { getUser } from '../../../../actions/auth';
import useStyles from "./styles";

const Recenzija = (review, setCurrentId) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card className={classes.card} raised elevation={6}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2">{dispatch(getUser(review.review.kreator)).email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" gutterBottom>{review.review.tekst}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">{moment(review.review.datum).fromNow()}</Typography>
        </Grid>
      </Grid>
      {(user && user.result._id === review.review.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(review.review._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <CardActions className={classes.cardActions}>
        {user && (user.result._id === review.review.creator || user.result.admin_stranice === true) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteReview(review.review._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Recenzija;
