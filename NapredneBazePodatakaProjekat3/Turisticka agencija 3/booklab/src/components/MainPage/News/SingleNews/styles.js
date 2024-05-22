import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "5px",
  },
  card: {
    padding: "0.5rem",
    backgroundColor: "#8e9aaf",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
  },
  autor: {
    textAlign: "left",
  },
  datum: {
    textAlign: "right",
  },
}));
