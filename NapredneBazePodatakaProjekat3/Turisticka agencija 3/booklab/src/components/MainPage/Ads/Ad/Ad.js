import React from "react";
import { Card, CardActions, Button, Typography, Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";

import { deleteAd } from "../../../../actions/ads";
import { getUser } from "../../../../actions/auth";
import useStyles from "./styles";

const Ad = (ad, setCurrentId) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const getCreator = (user_id) => {
    dispatch(getUser(user_id));
  };

  console.log(ad);
  
  if (!ad) {
    return <Typography variant="h3" component="h2">Ne postoje oglasi u bazi</Typography>;
  }

  if (!getCreator(ad.kreator)) {
    return <Typography variant="h3" component="h2">Kreator oglasa nije definisan</Typography>;
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      {user != null &&
        (user.result.admin_stranice === true ||
          user.result._id === ad.kreator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(ad._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
      <Grid container>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {ad.ime_knjige}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {ad.autor_knjige}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" component="p">
            {getCreator(ad.kreator).ime}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            {getCreator(ad.kreator).mesto_boravka}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            {getCreator(ad.kreator).broj_telefona}
          </Typography>
        </Grid>
      </Grid>
      <CardActions className={classes.cardActions}>
        {(user.result.admin_stranice === true ||
          user.result._id === ad.kreator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deleteAd(ad._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Ad;
