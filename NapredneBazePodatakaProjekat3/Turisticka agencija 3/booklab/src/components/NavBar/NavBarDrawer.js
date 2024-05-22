import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./styles";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  ListItem,
  List,
  Divider,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import {
  AccountCircle,
  Pageview,
  MenuBook,
  PeopleAlt,
  SwapHorizontalCircle,
  ChevronRight,
  ChevronLeft,
  Menu,
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import logo from "../logo.png";
import * as actionType from "../../constants/actionTypes";

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar2, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <img src={logo} alt="logo" width="140px" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className="navBarContainer"
        >
          <List>
            <ListItem>
              <BottomNavigationAction
                component={Link}
                to="/"
                label="Početna"
                value="pocetna"
                icon={<Pageview />}
              />
            </ListItem>
            <ListItem>
              <BottomNavigationAction
                component={Link}
                to="/groups"
                label="Grupe"
                value="grupe"
                icon={<PeopleAlt />}
              />
            </ListItem>
            <ListItem>
              <BottomNavigationAction
                component={Link}
                to="/books"
                label="Knjige"
                value="knjige"
                icon={<MenuBook />}
              />
            </ListItem>
            <ListItem>
              <BottomNavigationAction
                component={Link}
                to="/ads"
                label="Oglasi"
                value="Oglasi"
                icon={<SwapHorizontalCircle />}
              />
            </ListItem>
            <ListItem>
              <BottomNavigationAction
                component={Link}
                to="/user"
                label="Moj profil"
                value="Moj profil"
                icon={<AccountCircle />}
              />
            </ListItem>
            {user != null ? (
              <div>
                <ListItem>
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
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    className={classes.logout}
                    color="secondary"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </ListItem>
              </div>
            ) : (
              <ListItem>
                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </ListItem>
            )}
          </List>
        </BottomNavigation>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
