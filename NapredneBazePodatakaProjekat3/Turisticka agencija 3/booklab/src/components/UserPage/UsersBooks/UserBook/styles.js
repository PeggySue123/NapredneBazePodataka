import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#cbc0d3",
  },
  btn1: {
    alignContent: "flex-end",
    maxHeight: "20px",
    maxWidth: "80px",
    height: "6em",
    width: "3em",
    margin: "2px",
  },
}));
