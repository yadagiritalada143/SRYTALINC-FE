import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddCompanyForm,
  addCompanySchema,
} from "../../../../forms/add-company";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "@mantine/core";
import { addCompanyByRecruiter } from "../../../../services/user-services";
import { toast } from "react-toastify";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const AddCompany = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema),
  });

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await addCompanyByRecruiter(data);
      reset();
      toast("Company Added Successfully !", {
        style: {
          color: theme.colors.primary[2],
          backgroundColor: organizationConfig.theme.backgroundColor,
        },
        progressStyle: {
          background: theme.colors.primary[8],
        },
        icon: <IconCircleDashedCheck width={32} height={32} />,
      });
      navigate(`/${organizationConfig.organization}/employee/dashboard`);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        color: organizationConfig.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      <h1 className="text-center">Add Company</h1>
      <form
        style={{ color: organizationConfig.theme.button.textColor }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          {...register("companyName")}
          label="Company Name"
          className="m-4 p-4"
          error={errors.companyName?.message}
        />
        <fieldset
          className="m-4 p-4"
          style={{
            border: `1px solid ${organizationConfig.theme.borderColor}`,
          }}
        >
          <legend>
            <h1 className="px-2">Primary Contact</h1>
          </legend>
          <TextInput
            {...register("primaryContact.name")}
            label="Name"
            error={errors.primaryContact?.name?.message}
          />
          <TextInput
            {...register("primaryContact.email")}
            label="Email"
            error={errors.primaryContact?.email?.message}
          />
          <TextInput
            {...register("primaryContact.phone")}
            label="Phone"
            error={errors.primaryContact?.phone?.message}
          />
        </fieldset>

        <div className="flex flex-wrap">
          <fieldset
            className="flex-auto m-4 p-4"
            style={{
              border: `1px solid ${organizationConfig.theme.borderColor}`,
            }}
          >
            <legend>
              <h1 className="px-2">Secondary Contact 1</h1>
            </legend>
            <TextInput
              {...register("secondaryContact1.name")}
              label="Name"
              error={errors.secondaryContact1?.name?.message}
            />
            <TextInput
              {...register("secondaryContact1.email")}
              label="Email"
              error={errors.secondaryContact1?.email?.message}
            />
            <TextInput
              {...register("secondaryContact1.phone")}
              label="Phone"
              error={errors.secondaryContact1?.phone?.message}
            />
          </fieldset>

          <fieldset
            className="flex-auto m-4 p-4"
            style={{
              border: `1px solid ${organizationConfig.theme.borderColor}`,
            }}
          >
            <legend>
              <h1 className="px-2">Secondary Contact 2</h1>
            </legend>
            <TextInput
              {...register("secondaryContact2.name")}
              label="Name"
              error={errors.secondaryContact2?.name?.message}
            />
            <TextInput
              {...register("secondaryContact2.email")}
              label="Email"
              error={errors.secondaryContact2?.email?.message}
            />
            <TextInput
              {...register("secondaryContact2.phone")}
              label="Phone"
              error={errors.secondaryContact2?.phone?.message}
            />
          </fieldset>
        </div>
        <div className="text-right">
          <Button size="md" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Add Company"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;
