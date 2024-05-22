import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: "150px",
    padding: "4px",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#8e9aaf",
  },
  info: {
    textAlign: "center",
    color: "rgb(28, 28, 68)",
  },
  informacije: {
    height: "260px",
    padding: "4px",
  },
  dugme: {
    marginTop: "10px",
  },
  image: {
    width: 110,
    height: 138,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
  },
}));
