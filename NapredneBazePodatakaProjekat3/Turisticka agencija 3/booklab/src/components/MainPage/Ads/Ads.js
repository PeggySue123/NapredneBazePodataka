import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Ad from './Ad/Ad';

import useStyles from "./styles";

const Ads = ({ setCurrentId }) => {
  const { ads, isLoading } = useSelector((state) => state.ads);
  const classes = useStyles();

  if (!ads.length && !isLoading) return 'No ads';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {ads.map((ad) => (
          <Grid key={ad._id} item xs={12} sm={6} md={6}>
            <Ad ad={ad} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Ads;
