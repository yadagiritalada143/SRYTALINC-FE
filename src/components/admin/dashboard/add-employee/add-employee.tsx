import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Loader } from "@mantine/core";
import { toast } from "react-toastify";
import {
  AddEmployeeForm,
  addEmployeeSchema,
} from "../../../../types/form-schema";
import { OrganizationConfig } from "../../../../types/interfaces";
import { registerEmployee } from "../../../../services/api-services";
import axios from "axios";

const AddEmployee = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddEmployeeForm>({
    resolver: zodResolver(addEmployeeSchema),
  });

  const onSubmit = async (employeeDetails: AddEmployeeForm) => {
    try {
      await registerEmployee(employeeDetails);
      toast.success("Employee added successfully!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Failed: " + (error.response?.data?.message || "Unknown error")
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div
        className="w-full max-w-2xl p-8 shadow-lg rounded-lg"
        style={{
          backgroundColor: organizationConfig.theme.color,
          color: organizationConfig.theme.backgroundColor,
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Employee</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              {...register("firstName", { value: "" })}
              error={errors.firstName?.message}
              styles={{
                input: {
                  backgroundColor: organizationConfig.theme.backgroundColor,
                  color: organizationConfig.theme.color,
                },
              }}
            />

            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              {...register("lastName", { value: "" })}
              error={errors.lastName?.message}
              styles={{
                input: {
                  backgroundColor: organizationConfig.theme.backgroundColor,
                  color: organizationConfig.theme.color,
                },
              }}
            />

            <TextInput
              label="Email"
              placeholder="Enter email"
              {...register("email", { value: "" })}
              error={errors.email?.message}
              styles={{
                input: {
                  backgroundColor: organizationConfig.theme.backgroundColor,
                  color: organizationConfig.theme.color,
                },
              }}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              type="tel"
              {...register("mobileNumber")}
              error={errors.mobileNumber?.message}
              styles={{
                input: {
                  backgroundColor: organizationConfig.theme.backgroundColor,
                  color: organizationConfig.theme.color,
                },
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            className="mt-10"
            data-testid="submitButton"
            leftSection={isSubmitting && <Loader size="xs" color="blue" />}
            style={{
              backgroundColor: organizationConfig.theme.backgroundColor,
              color: organizationConfig.theme.color,
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Create Employee"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
