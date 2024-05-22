import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from "material-ui-chip-input";

import {
  createUsersBook,
  updateUsersBook,
} from "../../../../actions/usersBooks";
import useStyles from "./styles";

const AddUsersBookForm = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    return (
      <Typography variant="h3" component="h2">
        Ulogujte se da biste dodavali knjige
      </Typography>
    );
  }
  const [usersBookData, setUsersBookData] = useState({
    ime_knjige: "",
    autor_knjige: "",
    zanr: [],
    id_korisnika: user.result._id,
  });
  const usersBook = useSelector((state) =>
    currentId
      ? state.usersBooks.usersBooks.find(
          (usersBook) => usersBook._id === currentId
        )
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const clear = () => {
    setCurrentId(0);
    setUsersBookData({
      ime_knjige: "",
      autor_knjige: "",
      zanr: [],
      id_korisnika: user.result._id,
    });
  };

  useEffect(() => {
    if (!usersBook || !usersBook.ime_knjige) clear();
    if (usersBook) setUsersBookData(usersBook);
  }, [usersBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createUsersBook(usersBookData));
      clear();
    } else {
      dispatch(updateUsersBook(currentId, usersBookData));
      clear();
    }
  };

  const handleAddChip = (zanrovi) => {
    setUsersBookData({
      ...usersBookData,
      zanr: [...usersBookData.zanr, zanrovi],
    });
  };

  const handleDeleteChip = (chipToDelete) => {
    setUsersBookData({
      ...usersBookData,
      zanr: usersBookData.zanr.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId
            ? `Izmena "${usersBook.ime_knjige}"`
            : "Dodaj knjigu za zamenu"}
        </Typography>
        <TextField
          name="ime"
          variant="outlined"
          label="Ime"
          fullWidth
          value={usersBookData.ime_knjige}
          onChange={(e) =>
            setUsersBookData({ ...usersBookData, ime_knjige: e.target.value })
          }
        />
        <TextField
          name="autor"
          variant="outlined"
          label="Autor"
          fullWidth
          value={usersBookData.autor_knjige}
          onChange={(e) =>
            setUsersBookData({ ...usersBookData, autor_knjige: e.target.value })
          }
        />
        <div>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Zanrovi"
            fullWidth
            value={usersBookData.zanr}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
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

export default AddUsersBookForm;
