import { Box } from "@chakra-ui/react";
import SideBar from "../sidebar/SideBar";
import Calendar from "../calendar/Calendar";
import './main.css'

export default function MainArea(){
    return(
        <Box className="container">
            <SideBar className="sidebarMain"/>
            <Calendar className="calendarMain"/>
        </Box>
    )
}