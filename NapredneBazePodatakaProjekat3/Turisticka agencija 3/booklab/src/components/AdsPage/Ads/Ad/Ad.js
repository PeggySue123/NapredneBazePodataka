import React, { useEffect } from "react";
import { Card, CardActions, Button, Typography, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import UsersBooks from "../../UsersBooks/UsersBooks";

import { deleteAd } from "../../../../actions/ads";
import { getUsersBooks } from "../../../../actions/usersBooks";
import useStyles from "./styles";

const Ad = (ad, setCurrentId) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log(ad);

  useEffect(() => {
    dispatch(getUsersBooks(ad.ad.kreator));
  }, dispatch);

  return (
    <Card className={classes.card} raised elevation={6}>
      <Grid container>
        <Grid className={classes.adcontainer} container item xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {ad.ad.ime_knjige}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {ad.ad.autor_knjige}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {ad.ad.autor_drzava}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <UsersBooks />
        </Grid>
      </Grid>
      <CardActions className={classes.cardActions}>
        {user &&
          (user.result.admin_stranice === true ||
            user.result._id === ad.ad.kreator) && (
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deleteAd(ad.ad._id))}
            >
              <DeleteIcon fontSize="small" /> &nbsp; Obrisi
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Ad;
