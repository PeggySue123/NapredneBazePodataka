import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  item1: {
    order: 1,
    paddingRight: "0.5rem",
    marginBottom: "1rem",
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
  item2: {
    order: 3,
    marginBottom: "1rem",
    [theme.breakpoints.up("md")]: {
      order: 2,
    },
    height: 'auto'
  },
  item3: {
    order: 2,
    paddingLeft: "0.5rem",
    marginBottom: "1rem",
    [theme.breakpoints.up("md")]: {
      order: 3,
    },
  },
}));
