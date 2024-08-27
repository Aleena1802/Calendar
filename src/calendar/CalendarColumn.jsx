import "./calendar.css";
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function Column({ taskList }) {
  const [overlap, setOverlap] = useState(false);
  useEffect(() => {
    let overlapFound = false;
    if (taskList && taskList.length > 0 && taskList[0]?.day) {
      if (taskList[0].day === "Monday") {
        console.log(taskList[0]);
      }
      for (let index = 0; index < taskList.length - 1; index++) {
        const endHour = Number(taskList[index].end.substring(0, 2));
        const nextTaskStartHour = Number(
          taskList[index + 1].start.substring(0, 2)
        );
        if (endHour >= nextTaskStartHour) {
          overlapFound = true;
          console.log("overlap: " + overlap);
          console.log("tasklist ");
          console.log(taskList);
          break;
        }
      }
    }
    setOverlap(overlapFound);
  }, [taskList]);
  return (
    <Box className="taskCol">
      {Array.from({ length: 24 }, (_, index) => (
        <Box key={index} className="task"></Box>
      ))}
      <Box className={overlap ? "eventContainer" : "flexColumn"}>
        {taskList
          ? taskList.map((task, index) => {
              // const startDT = new Date("2024-08-27T00:00:00.000+04:00")
              const startHour = Number(task.start.substring(0, 2));
              const startMin = Number(task.start.substring(3, 5)) / 60;
              const endHour = Number(task.end.substring(0, 2));
              const endMin = Number(task.end.substring(3, 5)) / 60;
              const startTime = startHour + startMin;
              const endTime = endHour + endMin;
              let duration =
                endTime < startTime ? 24 - startTime : endTime - startTime;

              const topPosition =
                startHour === 0 && startMin === 0 ? 0 : startTime * 50;
              const taskHeight = duration.toFixed(1) * 50;

              //console.log("Duration: " + duration);
              return (
                <Box
                  key={index}
                  className={overlap ? "overlapEvent" : "event"}
                  style={{
                    height: `${taskHeight}px`,
                    top: `${topPosition}px`,
                  }}
                >
                  {task.task}
                </Box>
              );
            })
          : ""}
      </Box>
    </Box>
  );
}
