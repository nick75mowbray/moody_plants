import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginLeft: theme.spacing(2)
    },
    title: {
        color: '#2B2B2B',
        textDecoration: 'none',
        underline: 'none',
        fontWeight: 500,
        margin: '1rem 0'
    }
  }),
);

function NavLinks(){
    const classes = useStyles();


    return (
        <>
        <Router>
            <List>
                <Typography className={classes.root}>
                    <ListItem><Link className={classes.title} color="inherit" to="/">SHOP</Link></ListItem>
                    <ListItem> <Link className={classes.title} color="inherit" to="/about">ABOUT</Link></ListItem>
                    <ListItem><Link className={classes.title} color="inherit" to="/account">ACCOUNT</Link></ListItem>
                    <ListItem><Link className={classes.title} color="inherit" to="/cart">CART</Link></ListItem>
                    <ListItem><Link className={classes.title} color="inherit" to="/login">LOGIN</Link></ListItem>
                </Typography>
            </List>
        </Router>
        </>
    )
};

export default NavLinks;