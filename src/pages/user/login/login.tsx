import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import { OrganizationConfig } from "../../../types/interfaces";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "../../../types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const EmployeeLogin = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  return (
    <div
      className="flex justify-center items-center h-screen px-4"
      style={{
        color: organizationConfig.theme.color,
        backgroundColor: organizationConfig.theme.backgroundColor,
        fontFamily: organizationConfig.theme.fontFamily,
      }}
    >
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className=" shadow-lg border rounded-lg p-6 max-w-md w-full"
        style={{ borderColor: organizationConfig.theme.borderColor }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-4">
            EMPLOYEE LOGIN
          </h1>
          <img
            src={organizationConfig.logo}
            className="mb-4 w-20 h-20 object-contain"
            alt={organizationConfig.organization}
          />
        </div>
        <div className="mb-4">
          <TextInput
            {...register("email")}
            label="Email"
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4">
          <PasswordInput
            {...register("password")}
            label="Password"
            error={errors.password?.message}
          />
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <div className="w-full md:w-auto flex justify-center md:justify-start order-2 md:order-1">
            <Link to="forgot-password" className="text-blue-600 text-sm">
              Forgot Password
            </Link>
          </div>
          <div className="w-full md:w-auto flex justify-center order-1 md:order-2">
            <Button
              type="submit"
              data-testid="loginButton"
              className="w-1/2 md:w-auto"
              style={{ minWidth: "200px" }}
              disabled={isSubmitting}
              leftSection={isSubmitting && <Loader size="xs" color="blue" />}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeLogin;