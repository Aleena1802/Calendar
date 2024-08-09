import { Box } from "@chakra-ui/react";
import './calendar.css'
import React, { useEffect, useState, useRef } from "react";
import Column from "./CalendarColumn";

interface ITime {
    timeline: number[];
}

interface IDays {
    days: string[];
}

export default function Calendar() {

    const [data, setData] = useState([]);
    const refObject = useRef(false);

    useEffect(() => {
        if (!refObject.current) {
            refObject.current = true;
            fetch("/tasks.json")
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                })
                .catch((error) => {
                    console.error('Error fetching the JSON file:', error);
                });
        }
    }, []);

    const tasks = data.map((data) => { return data; });
    const mondayTasks = tasks.filter(task => task.day === 'Monday');
    const tuesdayTasks = tasks.filter(task => task.day === 'Tuesday');
    const wednesdayTasks = tasks.filter(task => task.day === 'Wednesday');
    const thursdayTasks = tasks.filter(task => task.day === 'Thursday');
    const fridayTasks = tasks.filter(task => task.day === 'Friday');
    const saturdayTasks = tasks.filter(task => task.day === 'Saturday');
    const sundayTasks = tasks.filter(task => task.day === 'Sunday');


    const daysArray: IDays = {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };

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
                        {timelineObject.timeline.map((time) => (
                            <Box className="time">{time}:00</Box>
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
                    <Column taskList={mondayTasks} />
                    <Column taskList={tuesdayTasks} />
                    <Column taskList={wednesdayTasks} />
                    <Column taskList={thursdayTasks} />
                    <Column taskList={fridayTasks} />
                    <Column taskList={saturdayTasks} />
                    <Column taskList={sundayTasks} />

                    {/* <Box className="taskCol">
                            {Array.from({ length: 23 }, (_, index) => (
                                <Box key={index} className="task">
                                </Box>
                            ))}
                            <Box className={overlap?'eventContainer':'flexColumn'}>
                                {mondayTasks.map((task, index) => {
                                    const startHour = Number(task.start.substring(0, 2));
                                    const startMin=Number(task.start.substring(3,5))/60;
                                    const endHour = Number(task.end.substring(0, 2));
                                    const endMin=Number(task.end.substring(3,5))/60;
                                    const startTime=startHour+startMin;
                                    const endTime=endHour+endMin;
                                    const duration = endTime.toFixed(2) - startTime.toFixed(2);
                                    
                                    return (
                                        <Box className={overlap?'overlapEvent':'event'} style={{ height: `${duration.toFixed(1) * 50}px`, top: `${(startHour - 1) * 50}px` }}>{task.task}</Box>
                                    )
                                })}
                            </Box>


                        </Box> */}
                    </Box>


                </Box>
            </Box>
        </Box>
    );
}
