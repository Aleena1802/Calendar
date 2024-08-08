import { Box } from "@chakra-ui/react";
import './calendar.css'
import React from "react";

interface ITime {
    timeline: number[];
}

interface IDays{
    days:string[];
}

export default function Calendar() {

    const daysArray: IDays = {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}

    const timelineObject: ITime = {
        timeline: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    };
    return (
        <Box className="calendarContainer">
            <Box className="optionContainer">
                This week
            </Box>
            <Box className="calendarGridContainer">
                <Box className="calendarGrid">
                    <Box className="timelineContainer">
                        {timelineObject.timeline.map((time)=>(
                            <Box className="time">{time}</Box>
                        ))}
                    </Box>
                    <Box className="daysContainer">
                        {daysArray.days.map((day) => (
                            <Box className="days">
                                {day}
                            </Box>
                        ))}
                    </Box>
                    <Box className="taskGrid">
                    {Array.from({ length: 161 }, (_, index) => (
                <Box key={index} className="task">
                </Box>
            ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}