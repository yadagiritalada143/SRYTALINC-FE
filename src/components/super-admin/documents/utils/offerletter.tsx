import { Button, Loader, Select, Textarea, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import {
  OfferLetterForm,
  offerLetterForm,
} from "../../../../forms/offerletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenerateOfferletterBySuperAdmin } from "../../../../services/super-admin-services";
import { toast } from "react-toastify";

const OfferLetterModal = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfferLetterForm>({ resolver: zodResolver(offerLetterForm) });

  const onSubmit = (data: OfferLetterForm) => {
    GenerateOfferletterBySuperAdmin(data)
      .then(() => {
        toast.success("Offer Letter generated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    reset();
  };
  return (
    <div className="mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full  p-8 ">
        <h2 className="text-2xl font-bold text-center mb-6">OFFER LETTER</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <TextInput
            label="Candidate Name"
            placeholder="Enter first name"
            {...register("nameOfTheCandidate")}
            error={errors.nameOfTheCandidate?.message}
          />

          <TextInput
            type="date"
            label="Joining Date"
            placeholder="Select joining date"
            {...register("dateOfJoining")}
            error={errors.dateOfJoining?.message}
          />

          <TextInput
            type="number"
            label="Compensation"
            placeholder="Enter Compensation"
            {...register("compensation")}
            error={errors.compensation?.message}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="User Role"
                {...field}
                error={errors.role?.message}
                placeholder="Select user role"
                value={field.value}
                data={[
                  { label: "employee", value: "employee" },
                  { label: "recruiter", value: "recruiter" },
                ]}
              />
            )}
          />
          <div></div>
          <TextInput
            label="Work Location"
            placeholder="Enter Work Location"
            {...register("workLocation")}
            error={errors.workLocation?.message}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Subject"
            className="w-full"
            maxRows={4}
            autosize
            placeholder="Enter Subject"
            {...register("subject")}
            error={errors.subject?.message}
          />
        </div>
        <div className="flex justify-between ">
          <div></div>
          <Button
            className=" mt-7 rounded-md"
            type="submit"
            data-testid="submitButton"
            leftSection={isSubmitting && <Loader size="xs" />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating" : "Generate OfferLetter"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfferLetterModal;
