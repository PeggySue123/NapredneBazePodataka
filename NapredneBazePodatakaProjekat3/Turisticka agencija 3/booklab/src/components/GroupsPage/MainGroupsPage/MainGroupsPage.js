import React from "react";
import Group from "./GroupWithInfo/GroupWithInfo";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const Groups = ({ setCurrentId }) => {
  const { groups, isLoading } = useSelector((state) => state.groups);
  if (!groups.length && !isLoading) return <Typography variant="h3" component="h2">Nema grupa</Typography>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {groups.map((group) => (
        <Grid key={group._id} item xs={12} sm={6}>
          <Group group={group} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Groups;
