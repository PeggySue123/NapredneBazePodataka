import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import SingleNews from "./SingleNews/SingleNews";

import useStyles from "./styles";

const News = ({ setCurrentId }) => {
  const { news, isLoading } = useSelector((state) => state.news);
  const classes = useStyles();

  if (!news.length && !isLoading) return <Typography variant="h3" component="h2">Nema novosti</Typography>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {news.map((singleNews) => (
        <Grid key={singleNews._id} item xs={12}>
          <SingleNews singleNews={singleNews} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default News;
