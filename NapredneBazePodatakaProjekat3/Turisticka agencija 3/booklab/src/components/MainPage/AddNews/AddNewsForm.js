import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createNews, updateNews } from '../../../actions/news';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  if (!user) {
    return (
      <Typography variant="h3" component="h2">Ulogujte se da biste dodali novost</Typography>
    )
  }
  const [newsData, setNewsData] = useState({ naslov: '', tekst: '', datum: new Date(), kreator: user.result._id });
  const news = useSelector((state) => (currentId ? state.news.news.find((singleNews) => singleNews._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setNewsData({ naslov: '', tekst: '', datum: new Date(), kreator: user.result._id });
  };

  useEffect(() => {
    if (!news || !news.naslov) clear();
    if (news) setNewsData(news);
  }, [news]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createNews(newsData, history));
      clear();
    } else {
      dispatch(updateNews(currentId, newsData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Izmena "${news.naslov}"` : 'Kreiranje novosti'}</Typography>
        <TextField name="ime" variant="outlined" label="Naslov" fullWidth value={newsData.naslov} onChange={(e) => setNewsData({ ...newsData, naslov: e.target.value })} />
        <TextField name="message" variant="outlined" label="Tekst" fullWidth multiline rows={4} value={newsData.tekst} onChange={(e) => setNewsData({ ...newsData, tekst: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Sacuvaj</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Ocisti</Button>
      </form>
    </Paper>
  );
};

export default Form;