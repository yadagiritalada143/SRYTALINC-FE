// import {
//   Container,
//   Group,
//   Button,
//   TextInput,
//   Title,
//   Grid,
//   Flex,
//   Textarea,
//   Text,
//   NumberInput,
//   Chip,
// } from "@mantine/core";
// import { OrganizationConfig } from "../../../../interfaces/organization";
// import { useEffect, useState } from "react";
// import {
//   AddCandidateForm,
//   candidateSchema,
// } from "../../../../forms/add-candidate";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   addPoolCandidateByRecruiter,
//   getPoolCandidateByRecruiter,
// } from "../../../../services/user-services";
// import { toast } from "react-toastify";
// import { organizationEmployeeUrls } from "../../../../utils/common/constants";

const UpdatePoolCandidateForm = () =>
  //     {
  //   organizationConfig,
  // }: {
  //   organizationConfig: OrganizationConfig;
  // }
  //  {
  //   const [candidate, setCandidate] = useState<AddCandidateForm>();
  //   const [skills, setSkills] = useState<string[]>([]);
  //   const [skillInput, setSkillInput] = useState("");
  //   const [newComment, setNewComment] = useState("");
  //   const [callDuration, setCallDuration] = useState<number | "">("");
  //   const [loading, setLoading] = useState(true);

  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //     setValue,
  //     getValues,
  //   } = useForm<AddCandidateForm>({
  //     resolver: zodResolver(candidateSchema),
  //   });

  //   const navigate = useNavigate();
  //   const { candidateId } = useParams();

  //   useEffect(() => {
  //     if (candidateId) {
  //       getPoolCandidateByRecruiter(candidateId)
  //         .then((data) => {
  //           if (data) {
  //             console.log("Fetched candidate data:", data);

  //             setCandidate(data);
  //             setSkills(
  //               data.evaluatedSkill ? data.evaluatedSkill.split(",") : []
  //             );
  //             setValue("candidateName", data.candidateName || "");
  //             setValue("contact.email", data.contact?.email || "");
  //             setValue("contact.phone", data.contact?.phone || "");
  //             setValue(
  //               "totalYearsOfExperience",
  //               data.totalYearsOfExperience || 0
  //             );
  //             setValue(
  //               "relevantYearsOfExperience",
  //               data.relevantYearsOfExperience || 0
  //             );
  //             setValue("comments", data.comments || []);
  //           }
  //         })
  //         .catch(() => {
  //           toast.error("Failed to fetch candidate details.");
  //         })
  //         .finally(() => setLoading(false));
  //     }
  //   }, [candidateId, setValue]);

  //   const handleSkillAdd = () => {
  //     if (skillInput.trim() && !skills.includes(skillInput.trim())) {
  //       setSkills([...skills, skillInput.trim()]);
  //       setSkillInput("");
  //     }
  //   };

  //   const handleSkillRemove = (skillToRemove: string) => {
  //     setSkills(skills.filter((skill) => skill !== skillToRemove));
  //   };

  //   const handleAddCommentWithDuration = () => {
  //     if (newComment.trim() && callDuration) {
  //       const currentComments = getValues("comments") || [];
  //       const callStart = new Date();
  //       const callEnd = new Date(callStart.getTime() + callDuration * 60 * 1000);
  //       const updatedComments = [
  //         ...currentComments,
  //         {
  //           comment: newComment,
  //           callStartsAt: callStart.toISOString(),
  //           callEndsAt: callEnd.toISOString(),
  //         },
  //       ];
  //       setValue("comments", updatedComments);
  //       setNewComment("");
  //       setCallDuration("");
  //     }
  //   };

  //   const handleUpdateCandidate = (data: AddCandidateForm) => {
  //     data.evaluatedSkill = skills.join(",");
  //     addPoolCandidateByRecruiter(data)
  //       .then(() => {
  //         toast.success("Candidate updated successfully!");
  //         setOpened(false);
  //         navigate(
  //           `${organizationEmployeeUrls(
  //             organizationConfig.organization_name
  //           )}/dashboard`
  //         );
  //       })
  //       .catch(() => {
  //         toast.error("Failed to update candidate.");
  //       });
  //   };

  //   const onDelete = () => {
  //     console.log("deleting");
  //   };

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <>
  //       <form
  //         onSubmit={handleSubmit(handleUpdateCandidate)}
  //         className="space-y-4"
  //       >
  //         <Container>
  //           <Title order={3}>Candidate Details</Title>
  //           <Grid gutter="md">
  //             <Grid.Col span={6}>
  //               <Controller
  //                 name="candidateName"
  //                 control={control}
  //                 render={({ field }) => (
  //                   <TextInput
  //                     label="Candidate Name"
  //                     {...field}
  //                     error={errors.candidateName?.message}
  //                   />
  //                 )}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6}>
  //               <Controller
  //                 name="contact.email"
  //                 control={control}
  //                 render={({ field }) => (
  //                   <TextInput
  //                     label="Email"
  //                     {...field}
  //                     error={errors.contact?.email?.message}
  //                   />
  //                 )}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6}>
  //               <Controller
  //                 name="contact.phone"
  //                 control={control}
  //                 render={({ field }) => (
  //                   <TextInput
  //                     label="Phone"
  //                     {...field}
  //                     error={errors.contact?.phone?.message}
  //                   />
  //                 )}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6}>
  //               <Controller
  //                 name="totalYearsOfExperience"
  //                 control={control}
  //                 render={({ field }) => (
  //                   <NumberInput
  //                     label="Total Experience"
  //                     {...field}
  //                     error={errors.totalYearsOfExperience?.message}
  //                   />
  //                 )}
  //               />
  //             </Grid.Col>
  //           </Grid>

  //           <Title order={4} mt="lg">
  //             Skills
  //           </Title>
  //           <Flex gap="md">
  //             <TextInput
  //               label="Skills"
  //               value={skillInput}
  //               onChange={(e) => setSkillInput(e.target.value)}
  //               onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
  //             />
  //             <Button onClick={handleSkillAdd}>Add Skill</Button>
  //           </Flex>
  //           <Group mt="md">
  //             {skills.map((skill) => (
  //               <Chip key={skill} onClick={() => handleSkillRemove(skill)}>
  //                 {skill} ✖
  //               </Chip>
  //             ))}
  //           </Group>

  //           <Title order={4} mt="lg">
  //             Add Comment with Call Duration
  //           </Title>
  //           <Flex gap="sm">
  //             <Textarea
  //               label="Add Comment"
  //               value={newComment}
  //               onChange={(e) => setNewComment(e.target.value)}
  //             />
  //             <NumberInput label="Call Duration (minutes)" value={callDuration} />
  //           </Flex>
  //           <Button onClick={handleAddCommentWithDuration} mt="sm">
  //             Add Comment with Duration
  //           </Button>

  //           <Title order={4} mt="lg">
  //             Comments
  //           </Title>
  //           {getValues("comments")?.map((comment, index) => (
  //             <div key={index} className="mb-2">
  //               <Text>{comment.comment}</Text>
  //               <Text>
  //                 Call Duration:{" "}
  //                 {Math.round(
  //                   (new Date(comment.callEndsAt).getTime() -
  //                     new Date(comment.callStartsAt).getTime()) /
  //                     60000
  //                 )}{" "}
  //                 minutes
  //               </Text>
  //               <Text size="xs" color="dimmed">
  //                 Call Start: {new Date(comment.callStartsAt).toLocaleString()}
  //               </Text>
  //               <Text size="xs" color="dimmed">
  //                 Call End: {new Date(comment.callEndsAt).toLocaleString()}
  //               </Text>
  //             </div>
  //           ))}
  //         </Container>

  //         <Group justify="right" mt="lg">
  //           <Button type="submit">Update Candidate</Button>
  //           <Button onClick={onDelete}>Delete Candidate</Button>
  //         </Group>
  //       </form>
  //     </>
  //   );
  // };
  {
    // console.log(organizationConfig);
    return <div>Coming soon</div>;
  };

export default UpdatePoolCandidateForm;
