import React from 'react';
import { Card, CardActions, Button, Typography } from '@material-ui/core/';
import { Delete, Edit} from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { deleteUser, updateUser } from '../../../../actions/auth';
import useStyles from './styles';

const User = (user, setCurrentId) => {
    const dispatch = useDispatch();
    const classes = useStyles();
  
    return (
      <Card className={classes.card} raised elevation={6}>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.ime}</Typography>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.email}</Typography>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.mesto_boravka}</Typography>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.broj_telefona}</Typography>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="secondary" onClick={() => dispatch(deleteUser(setCurrentId))}>
              <Delete fontSize="small" /> &nbsp; Obrisi
            </Button>
          {(!user.odobren) && (
            <Button size="small" color="secondary" onClick={() => dispatch(updateUser(setCurrentId, {...user, odobren: true}))}>
              <Edit fontSize="small" /> &nbsp; Odobri
            </Button>
          )}
          {(user.odobren && !user.admin_stranice) && (
            <Button size="small" color="secondary" onClick={() => dispatch(updateUser(setCurrentId, {...user, admin_stranice: true}))}>
              <Edit fontSize="small" /> &nbsp; Postavi za admina
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };
  export default User;