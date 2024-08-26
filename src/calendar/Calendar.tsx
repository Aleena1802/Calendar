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

    const tasks = data.map((data) => { return data; });
    const mondayTasks = tasks.filter(task => task.day === 'Monday');
    const tuesdayTasks = tasks.filter(task => task.day === 'Tuesday');
    const wednesdayTasks = tasks.filter(task => task.day === 'Wednesday');
    const thursdayTasks = tasks.filter(task => task.day === 'Thursday');
    const fridayTasks = tasks.filter(task => task.day === 'Friday');
    const saturdayTasks = tasks.filter(task => task.day === 'Saturday');
    const sundayTasks = tasks.filter(task => task.day === 'Sunday');

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
        timeline: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
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

function range(start, end, step = 1) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }


  function addToNextDay() {
    const extendedTasks = tasks.filter(task => {
        // Only filter tasks that have both a startDate and endDate
        if (task.startDate && task.endDate) {
            const startDate = new Date(task.startDate);
            const endDate = new Date(task.endDate);
            
            // Return tasks where the startDate and endDate are not the same
            return startDate.getTime() !== endDate.getTime();
        }
        return false;
    });

    const differenceInDays=[];

    for (let i = 0; i < extendedTasks.length; i++) {
        const startDate = new Date(extendedTasks[i].startDate);
        const endDate = new Date(extendedTasks[i].endDate);
        
        // Calculate the difference in milliseconds
        const differenceInMillis = endDate - startDate;
        
        // Convert milliseconds to days
        const difference = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));
        differenceInDays.push(difference);
        console.log(`Difference in Days: ${differenceInDays}`);
    }

    console.log(extendedTasks);
}

addToNextDay();

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
    </>
  );
}
