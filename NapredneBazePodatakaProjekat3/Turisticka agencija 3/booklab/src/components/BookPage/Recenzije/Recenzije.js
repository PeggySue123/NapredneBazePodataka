import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Recenzija from './Recenzija/Recenzija';
import useStyles from './styles';

const Recenzije = ({ setCurrentId }) => {
  const { isLoading, reviews } = useSelector((state) => state.reviews);
  const classes = useStyles();

  if (!reviews.length && !isLoading) return 'No reviews';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {reviews.map((review) => (
          <Grid key={review._id} item xs={12} sm={12} md={6} lg={3}>
            <Recenzija review={review} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};
export default Recenzije;