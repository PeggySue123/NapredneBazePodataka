import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteBook } from '../../../../actions/books';
import useStyles from "./styles";

const Book = (book, setCurrentId) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const openBook = (e) => {
    history.push(`/books/${book.book._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openBook}
      >
        <CardMedia className={classes.media} image={book.book.slika || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={book.book.ime_knjige} />
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{book.book.ime_knjige}</Typography>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{book.book.autor_knjige}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{book.book.opis_knjige.split(' ').splice(0, 20).join(' ')}...</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{book.book.rejting}</Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{book.book.zanr.map((zanr) => `#${zanr} `)}</Typography>
        </div>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user && user.result.admin_stranice === true) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteBook(book.book._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Obrisi
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Book;

/*{(user!= null && user.result.admin_stranice === true) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(book.book._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}*/