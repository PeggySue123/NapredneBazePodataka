import React from "react";
import {
  Card,
  CardActions,
  Button,
  Typography,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deleteNews } from "../../../../actions/news";
import useStyles from "./styles";

const SingleNews = (news, setCurrentId) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Card className={classes.card} raised elevation={6}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {news.singleNews.naslov}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="body1" component="p">
            {news.singleNews.tekst}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            {moment(news.singleNews.datum).fromNow()}
          </Typography>
        </Grid>
      </Grid>
      <CardActions className={classes.cardActions}>
        {(user && (user.result.admin_stranice === true || user.result._id === news.kreator)) && (
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deleteNews(news.singleNews._id))}
            >
              <DeleteIcon fontSize="small" /> &nbsp; Obrisi
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default SingleNews;
