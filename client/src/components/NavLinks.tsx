import React from 'react';
import { Link} from 'react-router-dom';
import { List, ListItem, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import './styles/style.scss';
import { useAuth0 } from '@auth0/auth0-react';


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
    const { loginWithRedirect, logout } = useAuth0();
    
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
        <>
        <CssBaseline />
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
                     {isAuthenticated ? 
                                <div className="border-gradient">
                                <Link 
                                    className="drawer-link" 
                                    color="inherit" 
                                    to="/logout" 
                                    onClick={() => logout({ returnTo: window.location.origin })}>
                                    LOGOUT
                                </Link>
                            </div>    
                        
                        : <div className="border-gradient">
                            <Link 
                                className="drawer-link" 
                                color="inherit" 
                                to="/login" 
                                onClick={() => loginWithRedirect()}>
                                LOGIN
                            </Link>
                        </div>}

                </Typography>

        </>
    )
};

export default NavLinks;