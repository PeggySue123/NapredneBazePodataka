import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      margin: "auto",
    },
  },
  item1: {
    paddingRight: "0.5rem",
    marginBottom: "1rem",
  },
  item2: {
    paddingLeft: "0.5rem",
  },
}));
