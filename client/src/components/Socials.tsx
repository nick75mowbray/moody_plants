import React from 'react';
import Logo from '../assets/logo.svg';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function Socials() {
    return (
        <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '1rem',
            paddingTop: '2rem'
        }}>
            <img
            src={Logo} 
            alt="LOGO"
            style={{
                width: '70%'}}/>

        </div>
        <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                padding: '0.5rem'
            }}>
                <InstagramIcon color="inherit"/>
                <MailOutlineIcon color="inherit" href='mailto:moodyplantprints@gmail.com'/>
        </div>
        </>
    )
}

export default Socials;