import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
  Container,
  Grow,
  Grid,
  AppBar,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import Pagination from "./Pagination/Pagination";

import useStyles from "./styles";
import CreateAdForm from "./CreateAd/CreateAdForm";
import Ads from "./Ads/Ads";
import { getAdsBySearch } from "../../actions/ads";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AdsPage = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const user = JSON.parse(localStorage.getItem("profile"));

  // eslint-disable-next-line
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [genres, setGenres] = useState([]);
  const history = useHistory();

  const searchAd = () => {
    if (genres) {
      dispatch(getAdsBySearch({ genres: genres.join(",") }));
      history.push(`/ads/search?genres=${genres.join(",")}`);
    } else {
      history.push("/");
    }
  };

  const handleAddChip = (genre) => setGenres([...genres, genre]);

  const handleDeleteChip = (chipToDelete) =>
    setGenres(genres.filter((genre) => genre !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={6} md={3} className={classes.item1}>
            <AppBar
              position="static"
              color="inherit"
              className={classes.appBar}
            >
              <ChipInput
                className={classes.chipInput}
                value={genres}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Pretrazi zanrove"
                variant="outlined"
              />
              <Button onClick={searchAd} variant="contained" color="primary">
                Pretrazi
              </Button>
            </AppBar>
            {!genres.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6} className={classes.item2}>
            <Ads setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.item3}>
            {user ? (
              <CreateAdForm currentId={currentId} setCurrentId={setCurrentId} />
            ) : (
              <Typography variant="h3" component="h2">
                Ulogujte se da biste napravili oglas
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default AdsPage;
