import { Box } from "@chakra-ui/react";
import timesheet from '../assets/timesheet-svgrepo-com.svg'
import clock from '../assets/clock-two-svgrepo-com.svg'
import calendar from '../assets/calendar-days-svgrepo-com.svg'
import './sidebar.css'

export default function SideBar(){
    return(
        <Box className="sideBarOutterDiv">
            <Box className="sidebarInnerDiv">
                <Box className="iconDiv">
                    <img src={timesheet} className="sidebarIcon"/>
                </Box>
                <Box className="sidebarText">
                    Timesheet
                </Box>
            </Box>
            <Box className="sidebarInnerDiv">
                <Box className="iconDiv">
                    <img src={clock} className="sidebarIcon"/>
                </Box>
                <Box className="sidebarText">
                    Time Tracker
                </Box>
            </Box>
            <Box className="sidebarInnerDiv">
                <Box className="iconDiv">
                    <img src={calendar} className="sidebarIcon"/>
                </Box>
                <Box className="sidebarText">
                    Calendar
                </Box>
            </Box>

        </Box>
    )
}