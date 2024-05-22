import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
//import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from "react-router-dom";

import useStyles from "./styles";

const GroupWithInfo = (group, setCurrentId) => {
  const classes = useStyles();
  //const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const openGroup = (e) => {
    history.push(`/groups/${group.group._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openGroup}
      >
        <CardMedia
          className={classes.media}
          image={
            group.group.slika ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={group.group.ime_grupe}
        />
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {group.group.ime_grupe}
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {group.group.aktivnost_grupe === "dvoNedeljno" ? "Jednom u dve nedelje" : group.group.aktivnost_grupe === "jednoMesecno" ? "Jednom mesečno" : "Jednom u dva meseca"}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {group.group.domaci_autor ? (
              <Typography variant="h5" component="h5">
                Obradjujemo domace autore
              </Typography>
            ) : (
              <Typography variant="h5" component="h5">
                Obradjujemo strane autore
              </Typography>
            )}
          </Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h5">
            {group.group.zanrovi.map((zanr) => `#${zanr} `)}
          </Typography>
        </div>
      </ButtonBase>
    </Card>
  );
};

export default GroupWithInfo;
