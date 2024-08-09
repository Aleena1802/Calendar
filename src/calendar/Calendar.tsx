import { Box } from "@chakra-ui/react";
import './calendar.css'
import React, { useEffect, useState, useRef } from "react";

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

    const daysArray: IDays = {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };

    const timelineObject: ITime = {
        timeline: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    };

    const [overlap, setOverlap]=useState(false);
    useEffect(() => {
        let overlapFound = false;
        mondayTasks.forEach((task, index) => {
            const endHour = Number(task.end.substring(0, 2));
            if (index < mondayTasks.length - 1) {
                const nextTaskStartHour = Number(mondayTasks[index + 1].start.substring(0, 2));
                if (endHour > nextTaskStartHour) {
                    overlapFound = true;
                }
            }
        });
        setOverlap(overlapFound);
    }, [mondayTasks]);


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
                        <Box className="taskCol">
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
                                    
                                    console.log("start time: "+ startTime.toFixed(2));
                                    console.log("end time: "+ endTime.toFixed(2));
                                    console.log("duration: "+ duration);
                                    return (
                                        <Box className={overlap?'overlapEvent':'event'} style={{ height: `${duration.toFixed(1) * 50}px`, top: `${(startHour - 1) * 50}px` }}>{task.task}</Box>
                                    )
                                })}
                            </Box>


                        </Box>
                    </Box>


                </Box>
            </Box>
        </Box>
    );
}
