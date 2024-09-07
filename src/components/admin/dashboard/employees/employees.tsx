import { OrganizationConfig } from "../../../../interfaces/organization";
import { Button, useMantineTheme } from "@mantine/core";
import EmpData from "./temp-emp.json";
import { IconEdit, IconUser } from "@tabler/icons-react";

const Employees = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{ color: organizationConfig.theme.color }}
      className=" h-screen p-8 overflow-x-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Employees</h2>
      <table className="min-w-full table-fixed text-center shadow-md ">
        <colgroup>
          <col className="w-32" />
          <col className="w-32" />
          <col className="w-32" />
          <col className="w-32" />
          <col className="w-32" />
          <col className="w-40" />
          <col className="w-48" />
          <col className="w-40" />
        </colgroup>
        <thead className="text-xs uppercase">
          <tr>
            <th className=" p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className=" p-2 border">Email</th>
            <th className="p-2 border">Mobile Number</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border"> Employment Type</th>
            <th className="p-2 border">Blood Ground</th>
            <th className="p-2 border">Employee Role</th>
            <th className="p-2 border">Update Details</th>
          </tr>
        </thead>
        <tbody className="text-sm ">
          {EmpData.map((employee) => {
            return (
              <tr
                key={employee._id.$oid}
                className="hover:bg-slate-200 hover:text-black "
              >
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  {employee.firstName}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  {employee.lastName}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  {employee.email}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  {employee.mobileNumber}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  {employee.userRole}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  Full-Time
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis  ">
                  0+
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                  <ul>
                    {employee.employeeRole.map((role, index) => {
                      return <li key={role.$oid}>{index + 1}. Role</li>;
                    })}
                  </ul>
                </td>
                <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                  <Button>
                    <IconUser /> {"  "}
                    <IconEdit />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
