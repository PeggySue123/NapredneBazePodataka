import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createAd, updateAd } from '../../../actions/ads';
import useStyles from './styles';

const CreateAdForm = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [adData, setAdData] = useState({ ime_knjige: '', autor_knjige: '', autor_drzava: '', zanr: [], kreator: user.result._id });
  const ad = useSelector((state) => (currentId ? state.ads.ads.find((ad) => ad._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setAdData({ ime_knjige: '', autor_knjige: '', autor_drzava: '', zanr: [], kreator: user.result._id });
  };

  useEffect(() => {
    if (!ad || !ad.ime_knjige) clear();
    if (ad) setAdData(ad);
  }, [ad]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createAd({...adData, ime_knjige: `${user.result.ime}: ${adData.ime_knjige}`, autor_knjige: `${user.result.mesto_boravka}: ${adData.autor_knjige}`, autor_drzava: `${user.result.broj_telefona}: ${adData.autor_drzava}` }, history));
      clear();
    } else {
      dispatch(updateAd(currentId, {...adData, ime_knjige: `${user.result.ime}: ${adData.ime_knjige}`, autor_knjige: `${user.result.mesto_boravka}: ${adData.autor_knjige}`, autor_drzava: `${user.result.broj_telefona}: ${adData.autor_drzava}` }));
      clear();
    }
  };

  const handleAddChip = (zanrovi) => {
    setAdData({ ...adData, zanr: [...adData.zanr, zanrovi] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setAdData({ ...adData, zanr: adData.zanr.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Izmena oglasa za knjigu: "${ad.ime_knjige}"` : 'Kreiranje oglasa'}</Typography>
        <TextField name="ime" variant="outlined" label="Ime" fullWidth value={adData.ime_knjige} onChange={(e) => setAdData({ ...adData, ime_knjige: e.target.value })} />
        <TextField name="autor" variant="outlined" label="Autor" fullWidth value={adData.autor_knjige} onChange={(e) => setAdData({ ...adData, autor_knjige: e.target.value })} />
        <TextField name="autor" variant="outlined" label="Drzava autora" fullWidth value={adData.autor_drzava} onChange={(e) => setAdData({ ...adData, autor_drzava: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Zanrovi"
            fullWidth
            value={adData.zanrovi}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Sacuvaj</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Ocisti</Button>
      </form>
    </Paper>
  );
};

export default CreateAdForm;