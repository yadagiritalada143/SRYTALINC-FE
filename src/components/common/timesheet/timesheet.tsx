import { useState } from "react";
import { Button, TextInput, Title, Table, Grid } from "@mantine/core";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";
import { OrganizationConfig } from "../../../interfaces/organization";
import { useMantineTheme } from "@mantine/core";
import { data } from "./resources";

const DateTableComponent = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  const [startDate, setStartDate] = useState<string>(
    moment().tz("Asia/Kolkata").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(
    moment().tz("Asia/Kolkata").add(7, "days").format("YYYY-MM-DD")
  );
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [daysInRange, setDaysInRange] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState(data);

  const getDateRange = (start: string, end: string): string[] => {
    const startDt = new Date(start);
    const endDt = new Date(end);
    const dates: string[] = [];
    while (startDt <= endDt) {
      dates.push(new Date(startDt).toISOString().split("T")[0]);
      startDt.setDate(startDt.getDate() + 1);
    }
    return dates;
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        toast.error("Start date must be before end date.");
        return;
      }
      const range = getDateRange(startDate, endDate);
      setDateRange(range);
      setDaysInRange(range.length);
    }
  };

  const extendRange = (direction: "forward" | "backward"): void => {
    if (!startDate || !endDate) return;

    const startDt = new Date(startDate);
    const endDt = new Date(endDate);
    const rangeExtension = daysInRange;

    if (direction === "backward") {
      const newStart = new Date(
        startDt.setDate(startDt.getDate() - rangeExtension)
      );

      const newEnd = new Date(endDt.setDate(endDt.getDate() - rangeExtension));

      setStartDate(newStart.toISOString().split("T")[0]);
      setEndDate(newEnd.toISOString().split("T")[0]);
      const newRange = getDateRange(
        newStart.toISOString().split("T")[0],
        newEnd.toISOString().split("T")[0]
      );
      setDateRange(newRange);
    } else {
      const newStart = new Date(
        startDt.setDate(startDt.getDate() + rangeExtension)
      );

      const newEnd = new Date(endDt.setDate(endDt.getDate() + rangeExtension));
      setStartDate(newStart.toISOString().split("T")[0]);
      setEndDate(newEnd.toISOString().split("T")[0]);
      const newRange = getDateRange(
        newStart.toISOString().split("T")[0],
        newEnd.toISOString().split("T")[0]
      );
      setDateRange(newRange);
    }
  };

  const getProjectTotalHours = (projectIndex: number) => {
    return dateRange.reduce((total, date) => {
      const hoursForDate = workingHours[projectIndex].activities.reduce(
        (taskTotal, task) => {
          const matchedDate = task.days.find(
            (taskDate) =>
              taskDate.date === moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
          );
          return taskTotal + (matchedDate ? matchedDate.hours : 0);
        },
        0
      );
      return total + hoursForDate;
    }, 0);
  };
  const handleChange = (
    newHours: number,
    projectIndex: number,
    taskIndex: number,
    date: string
  ) => {
    if (newHours) {
      setWorkingHours((prev) => {
        const updatedWorkingHours = prev.map((project, pIndex) => {
          if (pIndex === projectIndex) {
            return {
              ...project,
              activities: project.activities.map((task, tIndex) => {
                if (tIndex === taskIndex) {
                  const dateExists = task.days.some(
                    (day) =>
                      day.date ===
                      moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
                  );

                  const updatedDays = dateExists
                    ? task.days.map((day) =>
                        day.date ===
                        moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")
                          ? { ...day, hours: newHours }
                          : day
                      )
                    : [
                        ...task.days,
                        {
                          date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                          hours: newHours,
                        },
                      ];

                  return {
                    ...task,
                    days: updatedDays,
                  };
                }
                return task;
              }),
            };
          }
          return project;
        });

        return updatedWorkingHours;
      });
    }
  };

  return (
    <div
      className="w-full p-4"
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
      }}
    >
      <Title order={2} className="mb-4 text-center">
        Timesheet
      </Title>

      <Grid align="flex-end" className="mb-4">
        <Grid.Col span={3}>
          <TextInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            label="Start Date"
            className="mb-2"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInput
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            label="End Date"
            className="mb-2"
          />
        </Grid.Col>
        <div className="flex justify-center mb-4">
          <Button onClick={handleSearch} className="mx-2">
            Search
          </Button>
          <Button onClick={() => extendRange("backward")} className="mx-2">
            {"<"}
          </Button>
          <Button onClick={() => extendRange("forward")} className="mx-2">
            {">"}
          </Button>
        </div>
      </Grid>

      {dateRange.length > 0 && (
        <div style={{ overflowX: "auto", padding: "0 1rem" }}>
          <Table
            striped
            highlightOnHover
            className="mt-4 shadow-lg"
            style={{
              borderCollapse: "collapse",
              border: "1px solid #ddd",
              borderSpacing: "0 10px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{ padding: "0.75rem 1rem", border: "1px solid #ddd" }}
                >
                  Project Name
                </th>
                <th
                  style={{ padding: "0.75rem 1rem", border: "1px solid #ddd" }}
                >
                  Task Details
                </th>
                {dateRange.map((date) => (
                  <th
                    key={date}
                    style={{
                      backgroundColor: theme.colors.primary[0],
                      color: "#fff",
                      padding: "0.75rem 1rem",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    {moment(date).format("DD MMM")}
                  </th>
                ))}
                <th
                  style={{
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {workingHours.map((project: any, projectIndex: number) =>
                project.activities
                  .filter((task: any) => task.task_id !== "WEEK_OFF")
                  .map((task: any, taskIndex: number) => (
                    <tr
                      key={`${project.project_id}-${task.task_id}-${taskIndex}`}
                    >
                      {taskIndex === 0 && (
                        <td
                          rowSpan={project.activities.length - 1}
                          style={{
                            padding: "0.75rem 1rem",
                            border: "1px solid #ddd",
                          }}
                        >
                          {project.project_id}
                        </td>
                      )}
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1px solid #ddd",
                        }}
                      >
                        {task.task_id}
                      </td>
                      {dateRange.map((date) => {
                        const matchedDate = task.days.find(
                          (taskDate: any) =>
                            moment(taskDate.date, "DD-MM-YYYY").format(
                              "YYYY-MM-DD"
                            ) === date
                        );
                        const hours = matchedDate ? matchedDate.hours : "";
                        return (
                          <td
                            key={`${date}-${task.task_id}`}
                            style={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            <TextInput
                              type="number"
                              value={hours}
                              onChange={(e) =>
                                handleChange(
                                  parseInt(e.target.value),
                                  projectIndex,
                                  taskIndex,
                                  date
                                )
                              }
                              placeholder="0"
                              className="p-4"
                            />
                          </td>
                        );
                      })}
                      {taskIndex === 0 && (
                        <td
                          rowSpan={project.activities.length - 1}
                          style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                          }}
                        >
                          {getProjectTotalHours(projectIndex)}
                        </td>
                      )}
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DateTableComponent;
