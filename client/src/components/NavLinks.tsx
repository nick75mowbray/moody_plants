import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import './styles/style.scss';
import Login from '../components/Login';
import Logout from '../components/Logout';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginLeft: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
  }),
);

function NavLinks(){
    const classes = useStyles();


    return (
        <>
                <Typography className={classes.root}>
                    
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/">SHOP</Link>
                        </div>
                       
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/about">ABOUT</Link>
                        </div> 
                       
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/account">ACCOUNT</Link>
                        </div>
                        
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/cart">CART</Link>
                        </div>
                     
                        <div className="border-gradient">
                            <Link className="drawer-link" color="inherit" to="/login">
                                <Login/>
                                <Logout/>
                            </Link>
                        </div>
                        
                </Typography>

        </>
    )
};

export default NavLinks;