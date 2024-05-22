import React from "react";
import useStyles from "./styles";
import { Paper, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const InfoUser = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const openInfoUserForm = (e) => {
    history.push(`/InfoUserForm`);
  };

  return (
    <div className="adWithInfoContainer">
      {user != null ? (
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h6" component="h3">
            Ime: {user.result.ime}
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            e-mail: {user.result.email}
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            Broj telefona: {user.result.broj_telefona}
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            Mesto boravka: {user.result.mesto_boravka}
          </Typography>
          <Button onClick={openInfoUserForm}>Izmeni</Button>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h6" component="h3">
            Morate da se ulogujete da bi pristupili ovoj stranici.
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default InfoUser;
