import { Code, Tabs } from "@mantine/core";
import { EmployeeInterface } from "../../../interfaces/employee";
import { OrganizationConfig } from "../../../interfaces/organization";
import ProfileImageUploader from "../profile-image/profile-image";
import { useMantineTheme } from "@mantine/core";
const Profile = ({
  organizationConfig,
  details,
}: {
  details: EmployeeInterface;
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  return (
    <div>
      <div className="flex justify-between mx-8 my-8">
        <ProfileImageUploader />
        <div
          style={{
            color: organizationConfig.organization_theme.theme.button.textColor,
          }}
        >
          <p>First Name:{details?.firstName}</p>
          <p>Last Name: {details?.lastName}</p>
          <p>Email: {details?.email}</p>
          <p>Mobile: {details?.mobileNumber}</p>
        </div>
      </div>
      <div
        style={{
          color: theme.colors.primary[9],
          padding: "20px",
        }}
      >
        <Tabs
          mt="lg"
          defaultValue="bankDetails"
          styles={{
            tab: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Tabs.List className="my-4" grow>
            <Tabs.Tab className="font-bold" value="bankDetails">
              Bank Details
            </Tabs.Tab>
            <Tabs.Tab className="font-bold" value="employment">
              Employment Details
            </Tabs.Tab>
            <Tabs.Tab className="font-bold" value="general">
              General
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            style={{
              color:
                organizationConfig.organization_theme.theme.button.textColor,
              padding: "10px 0",
            }}
            value="bankDetails"
          >
            <p style={{ marginBottom: "10px" }}>
              Account Number: {details.bankDetailsInfo?.accountNumber || "N/A"}
            </p>
            <p style={{ marginBottom: "10px" }}>
              Account Holder Name:{" "}
              {details.bankDetailsInfo?.accountHolderName || "N/A"}
            </p>
            <p>IFSC Code: {details.bankDetailsInfo?.ifscCode || "N/A"}</p>
          </Tabs.Panel>

          <Tabs.Panel
            style={{
              color:
                organizationConfig.organization_theme.theme.button.textColor,
              padding: "10px 0",
            }}
            value="employment"
          >
            <p style={{ marginBottom: "10px" }}>
              Employment Type: {details.employmentType?.employmentType || "N/A"}
            </p>
            <p className="flex space-x-10">
              Employment Roles:{" "}
              {details.employeeRole.length > 0
                ? details.employeeRole.map((role) => (
                    <Code key={role._id}> {role.designation}</Code>
                  ))
                : "N/A"}
            </p>
          </Tabs.Panel>

          <Tabs.Panel
            style={{
              color:
                organizationConfig.organization_theme.theme.button.textColor,
              padding: "10px 0",
            }}
            value="general"
          >
            <p style={{ marginBottom: "10px" }}>
              Blood Group: {details.bloodGroup?.type || "N/A"}
            </p>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
