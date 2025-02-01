import { Code, Tabs } from "@mantine/core";
import { EmployeeInterface } from "../../../interfaces/employee";
import ProfileImageUploader from "../profile-image/profile-image";
import { useMantineTheme } from "@mantine/core";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { ColorDiv } from "../style-components/c-div";
const Profile = ({ details }: { details: EmployeeInterface }) => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <ColorDiv>
      <div className="flex  mx-8 my-8">
        <ProfileImageUploader organizationConfig={organizationConfig} />
        <div>
          <p>First Name:{details?.firstName}</p>
          <p>Last Name: {details?.lastName}</p>
          <p>Email: {details?.email}</p>
          <p>Mobile: {details?.mobileNumber}</p>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
        }}
      >
        <Tabs
          mt="lg"
          variant="pills"
          defaultValue="employment"
          color={theme.colors.primary[4]}
        >
          <Tabs.List className="my-4" grow>
            <Tabs.Tab className="font-bold " value="employment">
              Employment Details
            </Tabs.Tab>
            <Tabs.Tab className="font-bold" value="bankDetails">
              Bank Details
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            style={{
              padding: "10px 0",
            }}
            value="employment"
          >
            <p style={{ marginBottom: "10px" }}>
              Employment Type: {details.employmentType?.employmentType || "N/A"}
            </p>
            <p className="flex space-x-10">
              Employment Roles:
              {details.employeeRole.length > 0
                ? details.employeeRole.map((role) => (
                    <Code key={role._id}>{role.designation}</Code>
                  ))
                : "N/A"}
            </p>
            <p style={{ marginBottom: "10px" }}>
              Blood Group: {details.bloodGroup?.type || "N/A"}
            </p>
          </Tabs.Panel>

          <Tabs.Panel
            color={organizationConfig.organization_theme.theme.button.textColor}
            style={{
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
        </Tabs>
      </div>
    </ColorDiv>
  );
};

export default Profile;
