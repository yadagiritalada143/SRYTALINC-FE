import { Button, Loader, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllPoolCandidatesByEmployee } from "../../../../services/user-services";
import { organizationEmployeeUrls } from "../../../../utils/common/constants";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";

const PoolCandidateList = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPoolCandidatesByEmployee()
      .then((candidates) => {
        setCandidates(candidates);
        setFilteredCandidates(candidates);
        setIsLoading(false);
      })
      .catch((error) => {
        toast(error?.response?.data?.message || "Something went wrong");
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = candidates.filter((candidate: any) => {
      return (
        candidate.candidateName.toLowerCase().includes(query) ||
        candidate.contact.email.toLowerCase().includes(query) ||
        candidate.contact.phone.toString().includes(query)
      );
    });

    setFilteredCandidates(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mx-4 my-4">
        <h1 className="text-2xl font-bold text-center md:text-left">
          Manage Candidates
        </h1>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() =>
              navigate(
                `${organizationEmployeeUrls(
                  organizationConfig.organization_name
                )}/dashboard/add_pool_candidate`
              )
            }
          >
            Add Candidate
          </Button>
        </div>
      </div>

      <SearchBarFullWidht search={search} handleSearch={handleSearch} />

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <Table className="min-w-full table-auto border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Experience (Years)</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <Loader size="xl" />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredCandidates.map((candidate: any) => (
                <tr
                  key={candidate._id}
                  className="border-b hover:shadow-lg transition-all duration-300"
                >
                  <td className="px-4 py-2">{candidate.candidateName}</td>
                  <td className="px-4 py-2">{candidate.contact.email}</td>
                  <td className="px-4 py-2">{candidate.contact.phone}</td>
                  <td className="px-4 py-2">
                    {candidate.totalYearsOfExperience}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(candidate.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      onClick={() =>
                        navigate(
                          `${organizationEmployeeUrls(
                            organizationConfig.organization_name
                          )}/dashboard/${candidate._id}/edit_pool_candidate`
                        )
                      }
                      variant="outline"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default PoolCandidateList;
