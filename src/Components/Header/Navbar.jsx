import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu'
import Typography from '@material-ui/core/Typography';
import { Box, makeStyles, Button, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    logo: {
        color: "white",
        backgroundColor: "#377dff",
    },

}));

export default function Navbar() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        
        setAnchorEl(event.currentTarget);
        
    };

  const handleClose = () => {
    setAnchorEl(null);
  };


    const classes = useStyles();

    return (

        <AppBar position="static" className={classes.logo}>
        <Toolbar>
            <Typography variant='h6' className={classes.logo}>
                 {"ESPA ERP"}
            </Typography>

        <Box>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                 Open Menu
            </Button>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}>Profile</MenuItem>
  <MenuItem onClick={handleClose}>My account</MenuItem>
  <MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu></Box>
  </Toolbar>
</AppBar>
  
  );
}
