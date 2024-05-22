import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createGroup, updateGroup } from "../../../actions/groups";
import useStyles from "./styles";

const CreateGroupForm = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [groupData, setGroupData] = useState({
    ime_grupe: "",
    zanrovi: [],
    aktivnost_grupe: "dvoNedeljno",
    broj_clanova: "1",
    clanovi: [],
    administratori_grupe: [],
    comments: [],
    slika: "",
    domaci_autor: true,
  });
  const group = useSelector((state) =>
    currentId
      ? state.groups.groups.find((group) => group._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [authors, setAuthors] = React.useState("domaciAutori");

  const handleAuthors = (event) => {
    setAuthors(event.target.value);
    if (authors.value === "domaciAutori")
      setGroupData({ ...groupData, domaci_autor: true });
    else setGroupData({ ...groupData, domaci_autor: false });
  };

  const [frequency, setFrequency] = React.useState("dvoNedeljno");

  const handleFrequency = (event) => {
    setFrequency(event.target.value);
    setGroupData({ ...groupData, aktivnost_grupe: event.target.value });
  };

  const clear = () => {
    setCurrentId(0);
    setGroupData({
      ime_grupe: "",
      zanrovi: [],
      aktivnost_grupe: "dvoNedeljno",
      broj_clanova: "1",
      clanovi: [],
      administratori_grupe: [],
      comments: [],
      slika: "",
      domaci_autor: true,
    });
  };

  useEffect(() => {
    if (!group || !group.ime_grupe) {
      clear();
      setGroupData({
        ...groupData,
        administratori_grupe: [
          ...groupData.administratori_grupe,
          user.result._id,
        ],
      });
    }
    if (group) setGroupData(group);
  }, [group]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createGroup(groupData, history));
      clear();
    } else {
      dispatch(updateGroup(currentId, groupData));
      clear();
    }
  };

  const handleAddChip = (zanrovi) => {
    setGroupData({ ...groupData, zanrovi: [...groupData.zanrovi, zanrovi] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setGroupData({
      ...groupData,
      zanrovi: groupData.zanrovi.filter((tag) => tag !== chipToDelete),
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
          {currentId ? `Izmena "${group.ime_grupe}"` : "Kreiranje grupe"}
        </Typography>
        <TextField
          name="ime"
          variant="outlined"
          label="Ime"
          fullWidth
          value={groupData.ime_grupe}
          onChange={(e) =>
            setGroupData({ ...groupData, ime_grupe: e.target.value })
          }
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Aktivnost grupe</FormLabel>
          <RadioGroup
            aria-label="frequency"
            name="frequency1"
            value={frequency}
            onChange={handleFrequency}
          >
            <FormControlLabel
              value="dvoNedeljno"
              control={<Radio />}
              label="Jednom u dve nedelje"
            />
            <FormControlLabel
              value="jednoMesecno"
              control={<Radio />}
              label="Jednom u mesec dana"
            />
            <FormControlLabel
              value="dvoMesecno"
              control={<Radio />}
              label="Jednom u dva meseca"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Autori</FormLabel>
          <RadioGroup
            aria-label="autori"
            name="autori1"
            value={authors}
            onChange={handleAuthors}
          >
            <FormControlLabel
              value="domaciAutori"
              control={<Radio />}
              label="Domaci autori"
            />
            <FormControlLabel
              value="straniAutori"
              control={<Radio />}
              label="Strani autori"
            />
          </RadioGroup>
        </FormControl>
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Zanrovi"
            fullWidth
            value={groupData.zanrovi}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            color="secondary"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setGroupData({ ...groupData, slika: base64 })
            }
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

export default CreateGroupForm;
