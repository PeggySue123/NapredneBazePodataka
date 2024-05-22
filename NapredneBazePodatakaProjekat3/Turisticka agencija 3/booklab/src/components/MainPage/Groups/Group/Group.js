import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteGroup, updateGroup } from '../../../../api';
import useStyles from "./styles";

const Group = (group) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  if (!group){
    return (
      "Niste clan nijedne grupe"
    )
  }

  const openGroup = (e) => {
    history.push(`/groups/${group._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openGroup}
      >
        <CardMedia className={classes.media} image={group.slika || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={group.ime_grupe} />
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{group.ime_grupe}</Typography>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{group.aktivnost_grupe}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{group.domaci_autor ? 'Obradjuje domace autore' : 'Obradjuje strane autore'}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{group.broj_clanova}</Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{!group && group.zanrovi.map((zanr) => `#${zanr} `)}</Typography>
        </div>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(group && group.administratori_grupe && group.administratori_grupe.filter((administrator_grupe) => administrator_grupe===user._id)) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteGroup(group._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
        <Button size="small" color="secondary" onClick={() => dispatch(updateGroup({ ...group, clanovi: group.clanovi.filter((clan) => clan !== user._id) }))}>
          Napusti grupu
        </Button>
      </CardActions>
    </Card>
  );
};

export default Group;