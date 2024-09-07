import { useParams } from "react-router-dom";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { TextInput, Button, Select, useMantineTheme } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployeeUpdateForm,
  employeeSchema,
} from "../../../../forms/update-employee";
import {
  getEmployeeDetailsByAdmin,
  updateEmployeeDetailsByAdmin,
} from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const UpdateEmployee = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const params = useParams();
  const employeeEmail = params.employeeEmail as string;
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<EmployeeUpdateForm>({
    resolver: zodResolver(employeeSchema),
  });

  const bloodGroupOptions = [
    { value: "66cf1d7b43400091bccfdc7a", label: "O -ve" },
    { value: "66cf1d7b43400091bccfdc79", label: "O +ve" },
    { value: "66cf1d7b43400091bccfdc7b", label: "AB +ve" },
  ];

  const employmentTypeOptions = [
    { value: "66cae2a743400091bccfdc51", label: "FTE" },
    { value: "66cae2a743400091bccfdc52", label: "Contractor" },
  ];

  const onSubmit = (data: any) => {
    const newData = { ...data };
    newData.email = employeeEmail;
    const bloodGroupId = data.bloodGroup.id;
    const employmentTypeId = data.employmentType.id;
    const accountNumber = data.bankDetailsInfo.accountNumber;
    const accountHolderName = data.bankDetailsInfo.accountHolderName;
    const ifscCode = data.bankDetailsInfo.ifscCode;
    if (bloodGroupId) {
      newData.bloodGroup = bloodGroupId;
    } else {
      delete newData.bloodGroup;
    }
    if (employmentTypeId) {
      newData.employmentType = employmentTypeId;
    } else {
      delete newData.employmentType;
    }
    if (!accountNumber) {
      delete newData.bankDetailsInfo.accountNumber;
    }
    if (!accountHolderName) {
      delete newData.bankDetailsInfo.accountHolderName;
    }
    if (!ifscCode) {
      delete newData.bankDetailsInfo.ifscCode;
    }
    if (!ifscCode && accountHolderName && accountNumber) {
      delete newData.bankDetailsInfo;
    }

    updateEmployeeDetailsByAdmin(newData)
      .then(() => {
        toast("Updated Successful !", {
          style: {
            color: theme.colors.primary[2],
            backgroundColor: organizationConfig.theme.backgroundColor,
          },
          progressStyle: {
            background: theme.colors.primary[8],
          },
          icon: <IconCircleDashedCheck width={32} height={32} />,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Something went wrong");
      });
  };

  useEffect(() => {
    getEmployeeDetailsByAdmin(employeeEmail)
      .then((emp) => reset(emp))
      .catch((error) =>
        toast.error(error.response.data.message || "Something went wrong")
      );
  }, []);

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
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        <h3 className="text-lg font-bold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextInput
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <TextInput
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <TextInput
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextInput
            label="Mobile Number"
            {...register("mobileNumber")}
            error={errors.mobileNumber?.message}
          />
        </div>

        <div className="mb-6">
          <Controller
            {...register("bloodGroup.id")}
            control={control}
            render={({ field }) => (
              <Select
                data={bloodGroupOptions}
                label="Blood Group"
                {...field}
                error={errors.bloodGroup?.message}
              />
            )}
          />
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TextInput
            label="Account Number"
            {...register("bankDetailsInfo.accountNumber")}
            error={errors.bankDetailsInfo?.accountNumber?.message}
          />
          <TextInput
            label="Account Holder Name"
            {...register("bankDetailsInfo.accountHolderName")}
            error={errors.bankDetailsInfo?.accountHolderName?.message}
          />
          <TextInput
            label="IFSC Code"
            {...register("bankDetailsInfo.ifscCode")}
            error={errors?.bankDetailsInfo?.ifscCode?.message}
          />
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4">Employment Details</h3>
        <div className="mb-6">
          <Controller
            name="employmentType.id"
            control={control}
            render={({ field }) => (
              <Select
                label="Employment Type"
                data={employmentTypeOptions}
                {...field}
                error={errors.employmentType?.message}
              />
            )}
          />
        </div>

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
