import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import './styles/style.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginLeft: theme.spacing(2)
    },
  }),
);

function NavLinks(){
    const classes = useStyles();


    return (
        <>
            <List>
                <Typography className={classes.root}>
                    <ListItem >
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/">SHOP</Link>
                        </div>
                        </ListItem>
                    <ListItem > 
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/about">ABOUT</Link>
                        </div> 
                        </ListItem>
                    <ListItem >
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/account">ACCOUNT</Link>
                        </div>
                        </ListItem>
                    <ListItem >
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/cart">CART</Link>
                        </div>
                        </ListItem>
                    <ListItem >
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/login">LOGIN</Link>
                        </div>
                        </ListItem>
                </Typography>
            </List>
        </>
    )
};

export default NavLinks;