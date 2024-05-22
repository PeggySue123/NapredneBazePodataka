import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createBook, updateBook } from '../../../actions/books';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [bookData, setBookData] = useState({ ime_knjige: '', autor_knjige: '', opis_knjige: '', slika: '', rejting: '', zanr: [], comments: [] });
  const book = useSelector((state) => (currentId ? state.books.books.find((book) => book._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setBookData({ ime_knjige: '', autor_knjige: '', opis_knjige: '', slika: '', rejting: '', zanr: [], comments: [] });
  };

  useEffect(() => {
    if (!book || !book.ime_knjige) clear();
    if (book) setBookData(book);
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createBook(bookData, history));
      clear();
    } else {
      dispatch(updateBook(currentId, bookData));
      clear();
    }
  };

  const handleAddChip = (zanrovi) => {
    setBookData({ ...bookData, zanr: [...bookData.zanr, zanrovi] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setBookData({ ...bookData, zanr: bookData.zanr.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Izmena "${book.ime_knjige}"` : 'Kreiranje knjige'}</Typography>
        <TextField name="ime" variant="outlined" label="Ime" fullWidth value={bookData.ime_knjige} onChange={(e) => setBookData({ ...bookData, ime_knjige: e.target.value })} />
        <TextField name="autor" variant="outlined" label="Autor" fullWidth value={bookData.autor_knjige} onChange={(e) => setBookData({ ...bookData, autor_knjige: e.target.value })} />
        <TextField name="message" variant="outlined" label="Opis" fullWidth multiline rows={4} value={bookData.opis_knjige} onChange={(e) => setBookData({ ...bookData, opis_knjige: e.target.value })} />
        <TextField name="rejting" variant="outlined" label="Rejting" fullWidth value={bookData.rejting} onChange={(e) => setBookData({ ...bookData, rejting: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Zanrovi"
            fullWidth
            value={bookData.zanr}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setBookData({ ...bookData, slika: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Sacuvaj</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Ocisti</Button>
      </form>
    </Paper>
  );
};

export default Form;