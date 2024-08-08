import { Box } from "@chakra-ui/react"
import './nav.css'

export default function NavBar(){
    return(
        <Box className="navOutterDiv">
            <Box className="navHeading">
                Calendar
            </Box>
            <Box className="navIconContainer">
                <Box className="navIcon"></Box>
            </Box>
        </Box>
    )
}