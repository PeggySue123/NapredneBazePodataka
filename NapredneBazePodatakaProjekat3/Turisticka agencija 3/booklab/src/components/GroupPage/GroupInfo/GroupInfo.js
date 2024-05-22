import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useStyles from "./styles";
import { getGroup } from "../../../actions/groups";
import CommentSection from "../CommentSection/CommentSection";

const Group = () => {
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGroup(id));
  }, [id]);

  const { group, isLoading } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (isLoading) {
    return (
      <Paper elevation={8} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  if (!group)
    return (
      <Typography variant="h3" component="h2">
        Nema grupe u bazi
      </Typography>
    );

  return (
    <Paper className={classes.paper} elevation={6}>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Grid item className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                group.slika ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={group.ime_grupe}
            />
          </Grid>
          <Grid item className={classes.section}>
            <Typography variant="h3" component="h2">
              {group.ime_grupe}
            </Typography>
            <Typography variant="h6">
              Aktivnost grupe:{" "}
              {group.aktivnost_grupe === "dvoNedeljno"
                ? "Jednom u dve nedelje"
                : group.aktivnost_grupe === "jednoMesecno"
                ? "Jednom mesečno"
                : "Jednom u dva meseca"}
            </Typography>
            <Typography variant="h6">
              {group.domaci_autor ? (
                <Typography variant="h5" component="h5">
                  Obradjuje domace autore
                </Typography>
              ) : (
                <Typography variant="h5" component="h5">
                  Obradjuje strane autore
                </Typography>
              )}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {group.zanrovi.map((zanr) => `#${zanr} `)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CommentSection group={group} />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Group;
