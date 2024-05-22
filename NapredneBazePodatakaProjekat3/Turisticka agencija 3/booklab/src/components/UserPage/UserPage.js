import React, { useState, useEffect } from "react";
import InfoUser from "./InfoUser/InfoUser";
import UserBooks from "./UsersBooks/UserBooks";
import AddUserBook from "./UsersBooks/AddUsersBookForm/AddUserBookForm";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getUsersBooks } from "../../actions/usersBooks";
import useStyles from "./style";

const UserPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentUserBookId, setCurrentUserBookId] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (user) dispatch(getUsersBooks(user.result._id));
  }, [dispatch, currentUserBookId]);

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4} className={classes.item1}>
        <InfoUser />
      </Grid>
      <Grid item xs={12} md={4} className={classes.item2}>
        <UserBooks setCurrentUserBookId={setCurrentUserBookId} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} className={classes.item3}>
        <AddUserBook
          currentId={currentUserBookId}
          setCurrentId={setCurrentUserBookId}
        />
      </Grid>
    </Grid>
  );
};

export default UserPage;
