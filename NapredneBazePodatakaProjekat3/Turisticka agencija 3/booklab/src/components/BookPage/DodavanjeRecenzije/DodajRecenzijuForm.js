import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createReview, updateReview } from '../../../actions/reviews';
import useStyles from './styles';

const DodajRecenzijuForm = ({ currentId, setCurrentId, book_id }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [reviewData, setReviewData] = useState({ tekst: '', datum: '', kreator: user.result._id, knjiga: book_id });
  const review = useSelector((state) => (currentId ? state.reviews.reviews.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  const clear = () => {
    setCurrentId(0);
    setReviewData({ tekst: '', datum: '', kreator: user.result._id, knjiga: book_id });
  };

  if (!user) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Ulogujte se da biste napisali recenziju o knjizi.
        </Typography>
      </Paper>
    );
  }

  useEffect(() => {
    if (!review || !review.tekst) clear();
    if (review) setReviewData(review);
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createReview({ ...reviewData, kreator: user.result._id, knjiga: book_id }));
      clear();
    } else {
      dispatch(updateReview(currentId, { ...reviewData }));
      clear();
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField name="text" variant="outlined" label="Tekst" fullWidth value={reviewData.tekst} onChange={(e) => setReviewData({ ...reviewData, tekst: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Sacuvaj</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Ocisti</Button>
      </form>
    </Paper>
  );
};

export default DodajRecenzijuForm;
