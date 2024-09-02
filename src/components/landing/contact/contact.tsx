import { useForm } from "react-hook-form";
import { TextInput, Textarea, Button, Group } from "@mantine/core";
import { ContactForm, contactForm } from "../../../types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactForm) });

  const onSubmit = (data: ContactForm) => {
    console.log(data);
  };

  return (
    <div
      id="contact"
      className="flex bg-transparent justify-center items-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" px-8 py-4 w-full md:w-1/2  rounded-lg shadow-lg "
      >
        <h1 className="text-center text-xl font-semibold">Contact Us</h1>
        <TextInput
          label="Company Name"
          placeholder="Your company name"
          {...register("companyName", { required: "Company name is required" })}
          error={errors.companyName?.message}
        />

        <TextInput
          label="Email"
          placeholder="Your email"
          {...register("emailForContact", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter valid email !",
            },
          })}
          error={errors.emailForContact?.message}
          mt="md"
        />

        <TextInput
          label="Subject"
          placeholder="Message subject"
          {...register("subject", { required: "Please enter the Subject !" })}
          error={errors.subject?.message}
          mt="md"
        />

        <Textarea
          label="Message"
          placeholder="Your message"
          autosize
          maxRows={5}
          minRows={3}
          {...register("message", { required: "Please enter the Message !" })}
          error={errors.message?.message}
          mt="md"
        />

        <div className="mt-2 text-right">
          <Button type="submit" className="bg-blue-500 mt-4 hover:bg-blue-600">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactComponent;
