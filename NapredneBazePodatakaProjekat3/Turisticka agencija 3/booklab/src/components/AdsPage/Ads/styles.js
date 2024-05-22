import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    linkZaOglase: {
      maxHeight: '1em',
      margin: '2px',
      paddingTop: '5px'
    }
}));