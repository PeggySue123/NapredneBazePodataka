import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import {
  AccountCircle,
  Pageview,
  MenuBook,
  PeopleAlt,
  SwapHorizontalCircle,
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

import logo from "../logo.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user != null ? user.token : null;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [value, setValue] = React.useState("pocetna");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <img src={logo} alt="logo" width="140px" />
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.navBarContainer}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Početna"
          value="pocetna"
          icon={<Pageview />}
        />
        <BottomNavigationAction
          component={Link}
          to="/groups"
          label="Grupe"
          value="grupe"
          icon={<PeopleAlt />}
        />
        <BottomNavigationAction
          component={Link}
          to="/books"
          label="Knjige"
          value="knjige"
          icon={<MenuBook />}
        />
        <BottomNavigationAction
          component={Link}
          to="/ads"
          label="Oglasi"
          value="Oglasi"
          icon={<SwapHorizontalCircle />}
        />
        <BottomNavigationAction
          component={Link}
          to="/user"
          label="Moj profil"
          value="Moj profil"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
      <Toolbar className={classes.toolbar}>
        {user != null ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.ime.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Odjavi se
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Prijavi se
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/*
<Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
*/
