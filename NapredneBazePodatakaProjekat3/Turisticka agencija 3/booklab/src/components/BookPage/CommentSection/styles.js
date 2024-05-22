import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
  item1: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: "0.5rem",
    },
    marginBottom: "1rem",
  },
  item2: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "0.5rem",
    },
    marginBottom: "1rem",
  },
}));
