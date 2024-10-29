import { useEffect, useState } from "react";
import { OrganizationConfig } from "../../../../interfaces/organization";
import Profile from "../../../common/profile/profile";
import { getUserDetails } from "../../../../services/common-services";
import { toast } from "react-toastify";
import { EmployeeInterface } from "../../../../interfaces/employee";

const AdminProfile = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const [adminDetails, setAdminDetails] = useState<EmployeeInterface>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    userRole: "",
    employeeRole: [{ _id: "", designation: "" }],
    bloodGroup: { _id: "", type: "" },
    employmentType: { _id: "", employmentType: "" },
    bankDetailsInfo: {
      accountNumber: "",
      accountHolderName: "",
      ifscCode: "",
    },
  });

  useEffect(() => {
    getUserDetails()
      .then((user) => {
        setAdminDetails(user);
      })
      .catch((error) =>
        toast.error(error || error.message || error.response.data.message)
      );
  }, []);

  return (
    <>
      <Profile details={adminDetails} organizationConfig={organizationConfig} />
    </>
  );
};

export default AdminProfile;
