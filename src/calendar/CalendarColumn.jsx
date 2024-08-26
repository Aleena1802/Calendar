import './calendar.css'
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function Column({ taskList }) {

    const [overlap, setOverlap] = useState(false);
    useEffect(() => {
        let overlapFound = false;
        if (taskList) {
            taskList.forEach((task, index) => {
                const endHour = Number(task.end.substring(0, 2));
                if (index < taskList.length - 1) {
                    const nextTaskStartHour = Number(taskList[index + 1].start.substring(0, 2));
                    if (endHour > nextTaskStartHour) {
                        overlapFound = true;
                    }
                }
            })
        };
        setOverlap(overlapFound);
    }, [taskList]);
    return (
        <Box className="taskCol">
            {Array.from({ length: 24 }, (_, index) => (
                <Box key={index} className="task">
                </Box>
            ))}
            <Box className={overlap ? 'eventContainer' : 'flexColumn'}>
                {taskList ?
                    taskList.map((task, index) => {
                        const startHour = Number(task.start.substring(0, 2));
                        const startMin = Number(task.start.substring(3, 5)) / 60;
                        const endHour = Number(task.end.substring(0, 2));
                        const endMin = Number(task.end.substring(3, 5)) / 60;
                        const startTime = startHour + startMin;
                        const endTime = endHour + endMin;
                        let duration;

                        if (endTime < startTime) {
                            duration = (24 - startTime);  
                        } else {
                            duration = endTime - startTime;
                        }

                        console.log("Duration: " + duration);
                        return (
                            <Box className={overlap ? 'overlapEvent' : 'event'} style={{ height: `${duration.toFixed(1) * 50}px`, top: `${(startTime) * 50}px` }}>{task.task}</Box>
                        )
                    }) : ''}
            </Box>


        </Box>
    )
}