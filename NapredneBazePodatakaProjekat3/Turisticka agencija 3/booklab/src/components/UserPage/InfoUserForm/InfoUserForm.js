import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { updateUser } from "../../../actions/auth";
import useStyles from "./styles";

const InfoUserForm = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  if (!user) {
    return "Niste ulogovani";
  }
  const [userData, setUserData] = useState({
    ime: user.result.ime,
    mesto_boravka: user.result.mesto_boravka,
    broj_telefona: user.result.broj_telefona,
    email: user.result.email,
    password: user.result.password,
    admin_stranice: user.result.admin_stranice,
    odobren: user.result.odobren,
    grupe: user.result.grupe,
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  const clear = () => {
    setUserData({
      ime: user.result.ime,
      mesto_boravka: user.result.mesto_boravka,
      broj_telefona: user.result.broj_telefona,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(user.result._id, userData));
    clear();
    history.push(`/user`);
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Izmena podataka</Typography>
        <TextField
          name="ime"
          variant="outlined"
          label="Ime"
          fullWidth
          value={userData.ime}
          onChange={(e) => setUserData({ ...userData, ime: e.target.value })}
        />
        <TextField
          name="mesto"
          variant="outlined"
          label="Mesto boravka"
          fullWidth
          value={userData.mesto_boravka}
          onChange={(e) =>
            setUserData({ ...userData, mesto_boravka: e.target.value })
          }
        />
        <TextField
          name="broj"
          variant="outlined"
          label="Broj telefona"
          fullWidth
          value={userData.broj_telefona}
          onChange={(e) =>
            setUserData({ ...userData, broj_telefona: e.target.value })
          }
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Sacuvaj
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Ocisti
        </Button>
      </form>
    </Paper>
  );
};

export default InfoUserForm;
