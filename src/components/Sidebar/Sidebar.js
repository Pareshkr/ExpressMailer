import React from 'react';
import styles from './Sidebar.module.css';
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox"; 
import { Button, IconButton } from '@material-ui/core';
import SidebarOption from '../SidebarOption/SidebarOption';
import StarIcon from "@material-ui/icons/Star";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import NearMeIcon from "@material-ui/icons/NearMe";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import DuoIcon from "@material-ui/icons/Duo";
import PhoneIcon from "@material-ui/icons/Phone";
import { openSendMessage } from '../../features/mail';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Sidebar() {
    
    const history = useHistory();
    const dispatch = useDispatch()

    return <div className={styles.sidebar}>
            <Button 
                startIcon={<AddIcon fontsize="large"/>}
                className={styles.sidebar_compose}
                onClick={() => dispatch(openSendMessage())}
            >
                Compose
            </Button>

            <SidebarOption Icon={InboxIcon} title="Inbox"
             number={54} selected={true} />
            <SidebarOption Icon={StarIcon} title="Starred" number={54} />
            <SidebarOption Icon={AccessTimeIcon} title="Snoozed" number={54} />
            <SidebarOption Icon={LabelImportantIcon} title="Important" number={54} />
            <SidebarOption Icon={NearMeIcon} title="Sent" number={54} />
            <SidebarOption Icon={NoteIcon} title="Drafts" number={54} />
            <SidebarOption Icon={ExpandMoreIcon} title="More" number={54} />

            <div className={styles.sidebar_footer}>
                <div className={styles.sidebar_footerIcons}>
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                    <IconButton onClick={() => history.push('/meet/single/rugvedpb@gmail.com')}>
                        <DuoIcon />
                    </IconButton>
                    <IconButton>
                        <PhoneIcon />
                    </IconButton>
                </div>
            </div>
            <div>
                <b>(video call)</b><br></br>
                <IconButton onClick={() => history.push('/meet/single/rugvedpb@gmail.com')}>
                    rugvedpb@gmail.com
                    <DuoIcon />
                </IconButton>
                <br></br>
                <IconButton onClick={() => history.push('/meet/single/rugved.bongale@somaiya.edu')}>
                    rugved.bongale@somaiya.edu
                    <DuoIcon />
                </IconButton>
                <br></br>
            </div>
            <div>
                <b>(conference call)</b><br></br>
                <IconButton onClick={() => history.push('/meet/conference/anyRoomName')}>
                    Conf call
                    <DuoIcon />
                </IconButton>
                <br></br>
            </div>
        </div>;
}

export default Sidebar
