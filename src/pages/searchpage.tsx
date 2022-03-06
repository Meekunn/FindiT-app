import { useState } from 'react'
import Search from '../components/search'
import ProfileCard from '../components/profilecard'
import '../style/searchpage.scss'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginTop: 12,
    "& .MuiListItem-root": {
      "&:hover": {
        color: "orange"
      },
      "&.MuiListItem-divider": {
        borderBottom: "2px solid rgba(0,0,0,0.1)"
      }
    }
  },
  subheader: {
    backgroundColor: "rgba(0,0,0,0.1)",
    fontSize: 24,
    "&.MuiListSubheader-inset": { marginBottom: 12 } //no space
  },
  listItemText: {
    "& .MuiListItemText-primary": {
      fontSize: "1.2rem"
    }
  }
}));

export function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
}


const SearchPage = () => {
    
  
    

    const classes = useStyles();

    return (
        <div className='home-wrapper'>
            <div className='home-contain'>
                <div className='side-bar'>
                    <h2>FindiT</h2>
                </div>
                {/* <>  */}
      {/* <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal: string) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          placeholder="filter"
        />
        <List
          className={classes.listRoot}
          subheader={
            <ListSubheader
              color={"primary"}
              inset
              className={classes.subheader}
            >
              ICT DEPARTMENT
            </ListSubheader>
          }
        >
          {items.map((item, index) => {
            const labelId = `checkbox-list-label-${item}`;

            return (
              <ListItem
                key={item}
                role={undefined}
                dense
                button
                onClick={handleToggle(index)}
                divider
              >
               
                <ListItemText
                  id={labelId}
                  primary={item}
                  className={classes.listItemText}
                />
               
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <br />
      
    </> */}
                <div className='contents'>
                    <Search />
                    <div className='profile-cards'>
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
