import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// $gradient-one: #11998e;
// $gradient-two: #18C158;

// dark one #0A8279
// dark two #109A44

const CustomButton = withStyles((theme: Theme) => ({
    root: {
      color: '#fff',
      margin: '1rem 0',
      background: 'linear-gradient(to bottom, #11998e, #18C158)',
    //   padding: '1rem 5rem',
      borderRadius: 1,
      '&:hover': {
        background: 'linear-gradient(to bottom, #0A8279, #109A44)',
        fontWeight: 'bolder'
      },
    },
  }))(Button);

  export default CustomButton;