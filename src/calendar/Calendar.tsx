import { Box } from "@chakra-ui/react";
import "./calendar.css";
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
          console.error("Error fetching the JSON file:", error);
        });
    }
  }, []);

  const tasks = data.map((data) => {
    return data;
  });

  // pushToArray(mondayTasks, tuesdayTasks);
  // pushToArray(tuesdayTasks, wednesdayTasks);
  // pushToArray(wednesdayTasks, thursdayTasks);
  // pushToArray(thursdayTasks, fridayTasks);
  // pushToArray(fridayTasks, saturdayTasks);
  // pushToArray(saturdayTasks, sundayTasks);
  // pushToArray(sundayTasks, mondayTasks);

  const daysArray: IDays = {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  const timelineObject: ITime = {
    timeline: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
  };

  //   function pushToArray(arr1, arr2){
  //     for(let i = 0; i < arr1.length; i++){
  //         if(arr1[i].day !== arr1[i].endDay){
  //             const newItem = { ...arr1[i] };
  //             newItem.start = "00:00";
  //             newItem.end=arr1[i].end;
  //             newItem.endDay = arr1[i].endDay;
  //             newItem.day = newItem.endDay;
  //             arr2.push(newItem);
  //         }
  //     }
  // }

  // function range(start, end, step = 1) {
  //   const result = [];
  //   for (let i = start; i <= end; i += step) {
  //     result.push(i);
  //   }
  //   return result;
  // }

  function addToNextDay() {
    const extendedTasks = tasks.filter((task) => {
      if (task.startDate && task.endDate) {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);

        return startDate.getTime() !== endDate.getTime();
      }
      return false;
    });

    const dayMapping = {
      Monday: tasks.filter((task) => task.day === "Monday"),
      Tuesday: tasks.filter((task) => task.day === "Tuesday"),
      Wednesday: tasks.filter((task) => task.day === "Wednesday"),
      Thursday: tasks.filter((task) => task.day === "Thursday"),
      Friday: tasks.filter((task) => task.day === "Friday"),
      Saturday: tasks.filter((task) => task.day === "Saturday"),
      Sunday: tasks.filter((task) => task.day === "Sunday"),
    };

    // console.log(extendedTasks);
    for (let i = 0; i < extendedTasks.length; i++) {
      const task = extendedTasks[i];
      const endDate = new Date(task.endDate);
      // console.log("start date: " + startDate);

      let currentDay = new Date(task.startDate);
      while (currentDay <= endDate) {
        const startDate = new Date(task.startDate);
        const dayName = currentDay.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const dayArray = dayMapping[dayName];

        if (i === 0) {
          console.log(
            "currntday: " +
              currentDay +
              " " +
              currentDay.getTime() +
              " extended task: " +
              i
          );
          console.log(endDate.getTime());
        }
        const newTask = {
          ...task,
          day: dayName,
          start:
            currentDay.getTime() === startDate.getTime() ? task.start : "00:00",
          end: currentDay.getTime() === endDate.getTime() ? task.end : "23:59",
        };

        const taskIndex = dayArray.findIndex(
          (t) =>
            t.task === task.task &&
            t.startDate === task.startDate &&
            t.endDate === task.endDate &&
            t.day === dayName
        );

        if (taskIndex !== -1) {
          dayArray.splice(taskIndex, 1);
        }

        dayArray.push(newTask);
        currentDay.setDate(currentDay.getDate() + 1);
        //console.log("current day: " + currentDay);
      }
    }
    return dayMapping;
  }

  const days = addToNextDay();
  const mondayTasks = days["Monday"];
  const tuesdayTasks = days["Tuesday"];
  const wednesdayTasks = days["Wednesday"];
  const thursdayTasks = days["Thursday"];
  const fridayTasks = days["Friday"];
  const saturdayTasks = days["Saturday"];
  const sundayTasks = days["Sunday"];

  console.log("monday tasks: ");
  console.log(mondayTasks);

  return (
    <>
      <Box className="calendarContainer">
        <Box className="optionContainer">This week</Box>
        <Box className="calendarGridContainer">
          <Box className="calendarGrid">
            <Box className="timelineContainer">
              {timelineObject.timeline.map((time) => (
                <Box className="time">{time}:00</Box>
              ))}
            </Box>
            <Box className="daysContainer">
              {daysArray.days.map((day) => (
                <Box className="days">{day}</Box>
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
