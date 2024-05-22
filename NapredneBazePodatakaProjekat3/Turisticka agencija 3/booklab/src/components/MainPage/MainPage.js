import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import News from "./News/News";
import AddNewsForm from "./AddNews/AddNewsForm";
import Pagination from "./Pagination/Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const MainPage = () => {
  const classes = useStyles();
  const [currentNewsId, setCurrentNewsId] = useState(0);
  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <div className="mainPageContainer">
      <Grid container>
        <Grid container item xs={12} md={3} className={classes.item1}>
          <AddNewsForm
            currentId={currentNewsId}
            setCurrentId={setCurrentNewsId}
          />
        </Grid>
        <Grid container item xs={12} md={6} className={classes.item2}>
          <Grid item xs={12}>
            <News setCurrentId={setCurrentNewsId} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
