import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    maxWidth: "90%",
    maxHeight: "100%",
  },
  paper: {
    backgroundColor: "#8e9aaf",
    padding: "20px",
    borderRadius: "15px",
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  groupInfoContainer: {
    backgroundColor: "rgb(33, 173, 173)",
  },
  buttonImageContainer: {
    padding: "2em",
  },
  buttonImage: {
    height: "8em",
    width: "8em",
  },
}));
