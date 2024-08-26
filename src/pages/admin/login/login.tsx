import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "../../../types/form-schema";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../services/api-services";
import axios from "axios";
import { toast } from "react-toastify";
import { OrganizationConfig } from "../../../types/interfaces";
const AdminLogin = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const Submit = async (formData: LoginForm) => {
    try {
      const data = await loginAdmin(formData);
      localStorage.setItem("adminToken", data.token);
      toast.success("Login Successful!");
      navigate(`/${organizationConfig.organization}/admin/dashboard`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Login failed: " + (error.response?.data?.message || "Unknown error")
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

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
        onSubmit={handleSubmit(Submit)}
        className=" shadow-lg border rounded-lg p-6 max-w-md w-full"
        style={{ borderColor: organizationConfig.theme.borderColor }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-4">
            ADMIN LOGIN
          </h2>
          <img
            src={organizationConfig.logo}
            className="mb-4 w-20 h-20 object-contain"
            alt=""
          />
        </div>
        <div className="mb-4">
          <TextInput
            {...register("email")}
            label="Email"
            error={errors.email?.message}
            classNames={{
              input: "w-full",
              label: " font-semibold mb-1",
            }}
          />
        </div>
        <div className="mb-4">
          <PasswordInput
            {...register("password")}
            label="Password"
            error={errors.password?.message}
            classNames={{
              input: "w-full",
              label: "font-semibold mb-1",
            }}
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

export default AdminLogin;
