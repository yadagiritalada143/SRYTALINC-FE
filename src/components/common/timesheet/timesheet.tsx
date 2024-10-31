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
  const [workingHours, setWorkingHours] = useState<{
    [key: number]: { [date: string]: number };
  }>({});

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
    }
  };

  const handleHourChange = (
    projectIndex: number,
    date: string,
    newHours: number
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [projectIndex]: {
        ...prev[projectIndex],
        [date]: newHours || 0,
      },
    }));
  };

  const getProjectTotalHours = (projectIndex: number) => {
    return dateRange.reduce((total, date) => {
      const hours = workingHours[projectIndex]?.[date] || 0;
      return total + hours;
    }, 0);
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
              {data.map((project: any, index: number) => {
                const months = Object.keys(
                  project.acitivities.workingDays.month
                );
                return (
                  <>
                    <tr key={index}>
                      <td
                        rowSpan={
                          months.reduce(
                            (totalDays, month) =>
                              totalDays +
                              Object.keys(
                                project.acitivities.workingDays.month[month].day
                              ).length,
                            0
                          ) + 1
                        }
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1px solid #ddd",
                        }}
                      >
                        {project.project_id}
                      </td>
                    </tr>

                    {months.map((month) =>
                      Object.entries(
                        project.acitivities.workingDays.month[month].day
                      ).map(([day, task]: [string, any], taskIndex) => {
                        return (
                          <tr key={`${index}-${month}-${taskIndex}`}>
                            <td
                              style={{
                                padding: "0.75rem 1rem",
                                border: "1px solid #ddd",
                              }}
                            >
                              {task.task}
                            </td>
                            {dateRange.map((date) => {
                              const taskDate = moment(
                                `2024-${month}-${day}`,
                                "YYYY-MM-DD"
                              ).format("YYYY-MM-DD");
                              const hours =
                                workingHours[index]?.[date] ||
                                (taskDate === date ? task.hours : 0);

                              return (
                                <td
                                  key={`${date}-${taskIndex}`}
                                  style={{
                                    padding: "0.75rem 1rem",
                                    textAlign: "center",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  <TextInput
                                    type="number"
                                    value={hours || ""}
                                    onChange={(e) =>
                                      handleHourChange(
                                        index,
                                        date,
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    placeholder="0"
                                    style={{ width: "100%" }}
                                  />
                                </td>
                              );
                            })}
                            <td
                              style={{
                                padding: "0.75rem 1rem",
                                textAlign: "center",
                                border: "1px solid #ddd",
                                fontWeight: "bold",
                              }}
                            >
                              {getProjectTotalHours(index)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DateTableComponent;
