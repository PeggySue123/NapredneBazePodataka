import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
    backgroundColor: "#8e9aaf",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    marginBottom: "2rem",
    padding: "16px",
    backgroundColor: "#8e9aaf",
  },
  item1: {
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 1,
      paddingRight: "0.5rem",
    },
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
    marginBottom: "1rem",
  },
  item2: {
    order: 3,
    [theme.breakpoints.up("sm")]: {
      order: 3,
    },
    [theme.breakpoints.up("md")]: {
      order: 2,
    },
    marginBottom: "1rem",
  },
  item3: {
    order: 1,
    [theme.breakpoints.up("sm")]: {
      order: 2,
      paddingLeft: "0.5rem",
    },
    [theme.breakpoints.up("md")]: {
      order: 3,
    },
    marginBottom: "1rem",
  },
}));
