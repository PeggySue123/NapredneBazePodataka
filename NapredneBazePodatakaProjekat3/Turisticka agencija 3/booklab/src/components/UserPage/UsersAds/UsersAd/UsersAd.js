import React from "react";
import useStyles from './styles';
import { Paper, Typography, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import { deleteAd } from "../../../../actions/ads";

const userAd = (ad, setCurrentId) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5" component="h2">{ad.ime_knjige}</Typography>
        <Typography gutterBottom variant="h5" component="h2">{ad.autor_knjige}</Typography>
        <div>
          <Typography variant="body2" color="textSecondary" component="h2">{ad.zanr.map((zanr) => `#${zanr} `)}</Typography>
        </div>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteAd(ad._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </Paper>
    </div>
  );
};

export default userAd;