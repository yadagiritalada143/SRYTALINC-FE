import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddCompanyForm,
  addCompanySchema,
} from "../../../../forms/add-company";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { useForm, Controller } from "react-hook-form";
import { Button, Select, TextInput, Modal, Group } from "@mantine/core";
import {
  getCompanyDetailsByIdByRecruiter,
  updateCompanyByRecruiter,
} from "../../../../services/user-services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import { useMantineTheme } from "@mantine/core";
import { IconCircleDashedCheck } from "@tabler/icons-react";

const UpdateCompany = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  const params = useParams();
  const companyId = params.companyId as string;

  const [comments, setComments] = useState<
    { name: string; date: string; comment: string }[]
  >([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [newComment, setNewComment] = useState("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema),
  });

  useEffect(() => {
    getCompanyDetailsByIdByRecruiter(companyId)
      .then((response) => {
        reset(response);
        if (response.comments) {
          setComments(response.comments);
        }
      })
      .catch((error) => toast.error(error.response.data.message));
  }, [companyId, reset]);

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await updateCompanyByRecruiter(data, companyId);
      toast("Login Successful!", {
        style: {
          color: theme.colors.primary[2],
          backgroundColor: organizationConfig.theme.backgroundColor,
        },
        progressStyle: {
          background: theme.colors.primary[8],
        },
        icon: <IconCircleDashedCheck width={32} height={32} />,
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const handleAddComment = () => {
    const comment = {
      name: localStorage.getItem("firstName") || ("Recruiter" as string),
      date: new Date().toLocaleDateString(),
      comment: newComment,
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
    close();
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Update Company</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="px-4 flex flex-wrap space-x-10 ">
          <TextInput
            {...register("companyName")}
            label="Company Name"
            className="mb-4 w-1/3"
            disabled
            error={errors.companyName?.message}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                label="Select Status"
                placeholder="Pick value"
                className="w-1/3"
                {...field}
                data={[
                  { value: "Created", label: "Created" },
                  { value: "Followed Up", label: "Followed Up" },
                  {
                    value: "Waiting For Response",
                    label: "Waiting For Response",
                  },
                  { value: "Not Interested", label: "Not Interested" },
                  { value: "On Boarded", label: "On Boarded" },
                  { value: "Closed", label: "Closed" },
                ]}
                value={field.value}
              />
            )}
          />
          <div className="m-4 w-1/4 flex justify-center items-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Update Company"}
            </Button>
          </div>
        </div>

        <fieldset
          className="mx-4  p-4 border"
          style={{ borderColor: organizationConfig.theme.borderColor }}
        >
          <legend className="text-lg font-semibold">Primary Contact</legend>
          <TextInput
            {...register("primaryContact.name")}
            label="Name"
            className="mb-2"
            error={errors.primaryContact?.name?.message}
          />
          <TextInput
            {...register("primaryContact.email")}
            label="Email"
            className="mb-2"
            error={errors.primaryContact?.email?.message}
          />
          <TextInput
            {...register("primaryContact.phone")}
            label="Phone"
            className="mb-2"
            error={errors.primaryContact?.phone?.message}
          />
        </fieldset>

        <div className="flex flex-wrap">
          <fieldset
            className="flex-auto m-4 p-4 border"
            style={{ borderColor: organizationConfig.theme.borderColor }}
          >
            <legend className="text-lg font-semibold">
              Secondary Contact 1
            </legend>
            <TextInput
              {...register("secondaryContact1.name")}
              label="Name"
              className="mb-2"
              error={errors.secondaryContact1?.name?.message}
            />
            <TextInput
              {...register("secondaryContact1.email")}
              label="Email"
              className="mb-2"
              error={errors.secondaryContact1?.email?.message}
            />
            <TextInput
              {...register("secondaryContact1.phone")}
              label="Phone"
              className="mb-2"
              error={errors.secondaryContact1?.phone?.message}
            />
          </fieldset>

          <fieldset
            className="flex-auto m-4 p-4 border"
            style={{ borderColor: organizationConfig.theme.borderColor }}
          >
            <legend className="text-lg font-semibold">
              Secondary Contact 2
            </legend>
            <TextInput
              {...register("secondaryContact2.name")}
              label="Name"
              className="mb-2"
              error={errors.secondaryContact2?.name?.message}
            />
            <TextInput
              {...register("secondaryContact2.email")}
              label="Email"
              className="mb-2"
              error={errors.secondaryContact2?.email?.message}
            />
            <TextInput
              {...register("secondaryContact2.phone")}
              label="Phone"
              className="mb-2"
              error={errors.secondaryContact2?.phone?.message}
            />
          </fieldset>
        </div>

        <div className="text-right ">
          <div className="m-4">
            <Button size="md" onClick={open}>
              Add Comment
            </Button>
          </div>
        </div>

        <div className=" ">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="p-4  mx-4 my-4 hover:shadow-lg shadow-gray-500"
            >
              <p className="text-right">
                {moment(comment.date).format("DD MMM YYYY")}
              </p>
              <p className="text-left">{comment.comment}</p>
              <h2 className="font-semibold text-right">-{comment.name}</h2>
            </div>
          ))}
        </div>
      </form>

      <Modal opened={opened} onClose={close} title="Add Your Comment">
        <TextInput
          label="Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-between">
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleAddComment}>Add Comment</Button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateCompany;
