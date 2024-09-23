import { OrganizationConfig } from "../../../../interfaces/organization";
import { Button, useMantineTheme } from "@mantine/core";

import { IconEdit, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../../../../interfaces/employee";
import { getAllEmployeeDetailsByAdmin } from "../../../../services/admin-services";
import { toast } from "react-toastify";

const Employees = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployeeDetailsByAdmin()
      .then((employeesList) => setEmployees(employeesList))
      .catch((error) =>
        toast(error || error.response.data.message || "Something went wrong")
      );
  }, [employees]);

  return (
    <div
      style={{
        color: organizationConfig.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
      className="h-auto"
    >
      <div>
        <div className="flex justify-between items-center mx-4 my-4">
          <h1 className="text-2xl font-bold text-center">Manage Employee</h1>
          <div>
            <Button
              onClick={() =>
                navigate(
                  `/admin/${organizationConfig.organization}/dashboard/addemployee`
                )
              }
            >
              Add Employee
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-center shadow-md">
            <colgroup>
              <col className="w-56" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
            </colgroup>
            <thead className="text-xs uppercase">
              <tr>
                <th className="p-2 border">First Name</th>
                <th className="p-2 border">Last Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Mobile Number</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Employment Type</th>
                <th className="p-2 border">Blood Group</th>
                <th className="p-2 border">Employee Role</th>
                <th className="p-2 border">Update Details</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {employees.map((employee) => {
                return (
                  <tr
                    key={employee._id}
                    className="hover:bg-slate-200 hover:text-black"
                  >
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.firstName}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.lastName}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.email}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.mobileNumber}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.userRole}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.employmentType.employmentType}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employee.bloodGroup.type}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <ul>
                        {employee.employeeRole.map((role, index) => (
                          <li key={role._id}>
                            {index + 1}. {role.designation}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <Button
                        onClick={() =>
                          navigate(
                            `/admin/${organizationConfig.organization}/dashboard/update/${employee._id}`
                          )
                        }
                      >
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
      </div>
    </div>
  );
};

export default Employees;
