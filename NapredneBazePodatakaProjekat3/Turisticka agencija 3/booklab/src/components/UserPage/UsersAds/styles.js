import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    usersAdsContainer: {
        backgroundColor: "rgb(90, 118, 211)",
        height: "260px",
        padding: "4px",
        minWidth: "150px"
    },
    gridUsersAdsContainer: {
        height: "200px",
        overflowY: "scroll"
    },
    userDodajDugme: {
        width: "max-content",
        maxWidth: "200px",
        maxHeight: "20px"
    }
}));