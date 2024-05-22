import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#8e9aaf",
  },
  usersBooksContainer: {
    height: "auto",
    padding: "4px",
    minWidth: "150px",
  },
  usersBooksGridContainer: {
    height: "200px",
    overflowY: "scroll",
  },
  dugmeDodaj: {
    width: "max-content",
    maxHeight: "20px",
    maxWidth: "200px",
  },
}));
