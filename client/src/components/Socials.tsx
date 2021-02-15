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
                <a color="inherit" href="https://www.instagram.com/moody_plant_pics/" target="_blank">
                    <InstagramIcon color="inherit" />
                </a>
                <a href='mailto:moodyplantprints@gmail.com' target="_blank">
                    <MailOutlineIcon color="inherit" />
                </a>
                
        </div>
        </>
    )
}

export default Socials;