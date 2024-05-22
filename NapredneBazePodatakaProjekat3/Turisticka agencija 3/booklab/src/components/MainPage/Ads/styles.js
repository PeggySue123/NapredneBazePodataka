import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "18rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  adsContainer: {
    overflowY: "scroll",
    maxHeight: "16rem",
  },
}));
