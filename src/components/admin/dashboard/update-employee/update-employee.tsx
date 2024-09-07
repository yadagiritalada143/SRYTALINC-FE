import { useParams } from "react-router-dom";
import TempEmp from "./temp-update.json";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { TextInput, Button, Select, useMantineTheme } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployeeUpdateForm,
  employeeSchema,
} from "../../../../forms/update-employee";

const UpdateEmployee = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const { employeeId } = useParams();
  const theme = useMantineTheme();

  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EmployeeUpdateForm>({
    resolver: zodResolver(employeeSchema),
  });

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const employmentTypeOptions = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "contract", label: "Contract" },
  ];

  const onSubmit = (data: any) => {
    console.log("Form Submitted", data);
  };

  return (
    <div
      style={{
        color: organizationConfig.theme.color,
        fontFamily: theme.fontFamily,
      }}
      className="flex justify-center items-center py-12"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: organizationConfig.theme.backgroundColor,
          color: theme.colors.primary[8],
        }}
        className="rounded-lg shadow-lg w-full max-w-4xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Update {TempEmp.firstName} {TempEmp.lastName}'s Profile
        </h2>

        {/* Personal Information */}
        <h3 className="text-lg font-bold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextInput
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
            defaultValue={TempEmp.firstName}
          />
          <TextInput
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            defaultValue={TempEmp.lastName}
          />
          <TextInput
            label="Email"
            {...register("email")}
            error={errors.email?.message}
            defaultValue={TempEmp.email}
          />
          <TextInput
            label="Mobile Number"
            {...register("mobileNumber")}
            error={errors.mobileNumber?.message}
            defaultValue={TempEmp.mobileNumber}
          />
        </div>

        {/* Blood Group */}
        <div className="mb-6">
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Select
                label="Blood Group"
                data={bloodGroupOptions}
                {...field}
                error={errors.bloodGroup?.message}
                value={field.value}
                defaultValue="O+"
              />
            )}
          />
        </div>

        {/* Bank Details */}
        <h3 className="text-lg font-bold mt-8 mb-4">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TextInput
            label="Account Number"
            {...register("accountNumber")}
            error={errors.accountNumber?.message}
            defaultValue={TempEmp.bankDetailsInfo.accountNumber}
          />
          <TextInput
            label="Account Holder Name"
            {...register("accountHolderName")}
            error={errors.accountHolderName?.message}
            defaultValue={TempEmp.bankDetailsInfo.accountHolderName}
          />
          <TextInput
            label="IFSC Code"
            {...register("ifscCode")}
            error={errors.ifscCode?.message}
            defaultValue={TempEmp.bankDetailsInfo.ifscCode}
          />
        </div>

        {/* Employment Details */}
        <h3 className="text-lg font-bold mt-8 mb-4">Employment Details</h3>
        <div className="mb-6">
          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <Select
                label="Employment Type"
                data={employmentTypeOptions}
                {...field}
                error={errors.employmentType?.message}
                defaultValue="full-time"
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="mt-6">
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
