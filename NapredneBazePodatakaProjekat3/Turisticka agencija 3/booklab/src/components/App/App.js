import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../NavBar/NavBar";
import NavBarDrawer from "../NavBar/NavBarDrawer";
import MainPage from "../MainPage/MainPage";
import GroupsPage from "../GroupsPage/GroupsPage";
import BooksPage from "../BooksPage/BooksPage";
import BookPage from "../BookPage/BookPage";
import UserPage from "../UserPage/UserPage";
import GroupPage from "../GroupPage/GroupPage";
import AdsPage from "../AdsPage/AdsPage";
import DodajKnjiguKorisnikaForm from "../UserPage/UsersBooks/AddUsersBookForm/AddUserBookForm";
import CreateAd from "../AdsPage/CreateAd/CreateAdForm";
import Auth from "../Auth/Auth";
import InfoUserForm from "../UserPage/InfoUserForm/InfoUserForm";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  let isPageWide = useMediaQuery("(min-width: 960px)");

  return (
    <BrowserRouter>
      <Container>
        {isPageWide && <NavBar className="NavBar" />}
        {!isPageWide && <NavBarDrawer className="NavBar" />}
        <Switch>
          <Route path="/" exact component={() => <MainPage />} />
          <Route path="/groups" exact component={() => <GroupsPage />} />
          <Route path="/groups/search" exact component={() => <GroupsPage />} />
          <Route path="/groups/:id" exact component={() => <GroupPage />} />
          <Route path="/books" exact component={() => <BooksPage />} />
          <Route path="/books/search" exact component={() => <BooksPage />} />
          <Route path="/books/:id" exact component={() => <BookPage />} />
          <Route path="/ads" exact component={() => <AdsPage />} />
          <Route path="/ads/search" exact component={() => <AdsPage />} />
          <Route path="/user" exact component={() => <UserPage />} />
          <Route
            path="/InfoUserForm"
            exact
            component={() => <InfoUserForm />}
          />
          <Route
            path="/DodajKnjiguKorisnika"
            exact
            component={() => <DodajKnjiguKorisnikaForm />}
          />
          <Route path="/DodajOglas" exact component={() => <CreateAd />} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
