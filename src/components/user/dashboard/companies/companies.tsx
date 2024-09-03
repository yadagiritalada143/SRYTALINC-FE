import { useState, useEffect } from "react";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { getCompanyDetails } from "../../../../services/user-services";
import { toast } from "react-toastify";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconUserEdit } from "@tabler/icons-react";
import { CompaniesInterface } from "../../../../interfaces/companies";
import moment from "moment";

const Companies = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCompanyDetails()
      .then((data) => setCompanies(data))
      .catch((error) =>
        toast.error(error.response.data.message || "Something went wrong")
      );
  }, []);

  return (
    <div
      style={{
        color: organizationConfig.theme.color,
      }}
      className="w-full h-screen p-8 bg-gray-100"
    >
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl font-bold text-center">
          Manage Pool Companies
        </h1>
        <div>
          <Button
            onClick={() =>
              navigate(
                `/${organizationConfig.organization}/employee/dashboard/addcompany`
              )
            }
          >
            Add Company
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          className="min-w-full text-center border-collapse bg-white shadow-md"
          style={{
            borderColor: organizationConfig.theme.color,
          }}
        >
          <thead
            className="text-xs uppercase"
            style={{
              backgroundColor: organizationConfig.theme.color,
              color: organizationConfig.theme.backgroundColor,
            }}
          >
            <tr>
              <th className="p-4 border" rowSpan={2}>
                Company Name
              </th>
              <th className="p-4 border" colSpan={3}>
                Primary Contact
              </th>
              <th className="p-4 border" colSpan={3}>
                Secondary Contact 1
              </th>
              <th className="p-4 border" colSpan={3}>
                Secondary Contact 2
              </th>
              <th className="p-4 border" rowSpan={2}>
                Status
              </th>
              <th className="p-4 border" rowSpan={2}>
                Last Update
              </th>
              <th className="p-4 border" rowSpan={2}>
                Update
              </th>
            </tr>
            <tr>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Email</th>
              <th className="p-4 border">Phone</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Email</th>
              <th className="p-4 border">Phone</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Email</th>
              <th className="p-4 border">Phone</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {companies.map((company: CompaniesInterface) => (
              <tr className="odd:bg-gray-400 even:bg-gray-600 hover:bg-slate-200 text-sm text-left">
                <td className="px-4 py-2 w-40">{company.companyName}</td>
                <td className="px-4 py-2 w-32">
                  {company.primaryContact.name}
                </td>
                <td className="px-4 py-2 w-48">
                  {company.primaryContact.email}
                </td>
                <td className="px-4 py-2 w-32">
                  {company.primaryContact.phone}
                </td>
                <td className="px-4 py-2 w-32">
                  {company.secondaryContact_1.name}
                </td>
                <td className="px-4 py-2 w-48">
                  {company.secondaryContact_1.email}
                </td>
                <td className="px-4 py-2 w-32">
                  {company.secondaryContact_1.phone}
                </td>
                <td className="px-4 py-2 w-32">
                  {company.secondaryContact_2.name}
                </td>
                <td className="px-4 py-2 w-48">
                  {company.secondaryContact_2.email}
                </td>
                <td className="px-4 py-2 w-32">
                  {company.secondaryContact_2.phone}
                </td>
                <td className="px-4 py-2 w-32">{company.status}</td>
                <td className="px-4 py-2 w-32">
                  {moment(company.lastUpdatedAt).format("MMM Do YY")}
                </td>
                <td className="px-4 py-2 w-24">
                  <Button
                    onClick={() =>
                      navigate(
                        `/${organizationConfig.organization}/employee/dashboard/update/${company.id}`
                      )
                    }
                  >
                    <IconUserEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Companies;
