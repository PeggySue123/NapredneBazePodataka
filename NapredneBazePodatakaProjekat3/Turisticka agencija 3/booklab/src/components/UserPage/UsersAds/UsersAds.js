import React from "react";
import { CircularProgress, Typography, Grid } from "@material-ui/core";
import { useSelector } from 'react-redux';

import UserAd from "./UsersAd/UsersAd"
import useStyles from "./styles";

const UsersAds = ( setCurrentId ) => {
  const { ads, isLoading } = useSelector((state) => state.books);
  const classes = useStyles();

  console.log(ads);
  if (!ads || (!ads.length && !isLoading)) return 'No ads';  

  return (
    isLoading ? <CircularProgress /> : (
      <div className={classes.usersAdsContainer}>
        <Typography variant="h6">Oglasi korisnika</Typography>
        <Grid container className={classes.gridUsersAdsContainer}>
          {ads.map((ad) => (
            <Grid key={ad._id} item lg={6} md={12}>
              <UserAd ad={ad} setCurrentId={setCurrentId} />
            </Grid>
            ))}
        </Grid>
      </div>
    )
  );
};

export default UsersAds;
