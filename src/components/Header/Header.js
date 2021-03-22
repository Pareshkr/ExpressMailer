import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react'
import styles from './Header.module.css'
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from '../../features/userSlice';
import { auth } from '../../firebase';
import { toggleSidebar } from '../../features/commonSlice';

// Modal when clicked on self avatar
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

 
  function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    };

    const toggleSidebarFunction = () => {
        dispatch(toggleSidebar())
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
        <div className={styles.header}>
            <div className={styles.header__left}>
                <IconButton>
                    <MenuIcon onClick={toggleSidebarFunction} />
                </IconButton>
                <img 
                    src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" 
                    alt="gmail icon"
                />
            </div>
            <div className={styles.header__middle}>
                <SearchIcon />
                <input placeholder="Search mail" type="text" className={styles.header__inputCaret} />
                <ArrowDropDownIcon />
            </div>

            <div className={styles.header__right}>
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                {/* <Avatar onClick={signOut} src={user?.photoUrl} /> */}
                <Avatar onClick={handleClick} src={user?.photoUrl} />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem>
                        <Avatar src={user?.photoUrl} />
                    </MenuItem>
                    <MenuItem >{user.displayName}</MenuItem>
                    <MenuItem >{user.email}</MenuItem>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Header