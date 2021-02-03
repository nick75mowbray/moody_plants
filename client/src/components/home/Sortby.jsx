import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Popular',
  'Name',
  'Price',
  'Size',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Sortby() {
  const classes = useStyles();
  const theme = useTheme();
  const [sort, setSort] = React.useState([]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div>
      
      <FormControl className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          multiple
          displayEmpty
          value={sort}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            if ((selected).length === 0) {
              return <em>Sort by:</em>;
            }

            return (selected).join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Sort by:</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, sort, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </div>
  );
}
