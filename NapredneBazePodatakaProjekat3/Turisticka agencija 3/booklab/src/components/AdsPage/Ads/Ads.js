import React from "react";
import { useSelector } from 'react-redux';
import Ad from "./Ad/Ad";
import { Typography, CircularProgress, Grid } from "@material-ui/core";
import useStyles from './styles';

const Ads = ({ setCurrentId }) => {
  const { ads, isLoading } = useSelector((state) => state.ads);
  const classes = useStyles();

  if (!ads.length && !isLoading) return <Typography variant="h3" component="h2">Nema oglasa</Typography>;

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary">Oglasi</Typography>
        </Grid>
        <Grid container item xs={12} alignItems="stretch" spacing={3}>
          {ads.map((ad) => (
            <Grid item lg={12} md={12}>
              <Ad ad={ad} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  );
};

export default Ads;
