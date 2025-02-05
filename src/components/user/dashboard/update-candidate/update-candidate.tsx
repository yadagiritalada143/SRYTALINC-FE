import {
  Container,
  Group,
  Button,
  TextInput,
  Title,
  Grid,
  Textarea,
  Text,
  NumberInput,
  Chip,
  // Flex,
  Input,
  Box,
  Spoiler,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  AddCandidateForm,
  candidateSchema,
} from "../../../../forms/add-candidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  //  useNavigate,
  useParams,
} from "react-router-dom";
import {
  // addPoolCandidateByRecruiter,
  getPoolCandidateByRecruiter,
} from "../../../../services/user-services";
import { toast } from "react-toastify";
// import { organizationEmployeeUrls } from "../../../../utils/common/constants";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { DateTimePicker } from "@mantine/dates";
import { PoolCandidatesComments } from "../../../../interfaces/candidate";
import { BgDiv } from "../../../common/style-components/bg-div";
import moment from "moment";

const UpdatePoolCandidateForm = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<PoolCandidatesComments[]>([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<AddCandidateForm>({
    resolver: zodResolver(candidateSchema),
  });

  // const navigate = useNavigate();
  const { candidateId } = useParams();

  useEffect(() => {
    if (candidateId) {
      getPoolCandidateByRecruiter(candidateId)
        .then((data) => {
          setComments(data.comments);

          reset(data);
        })
        .catch(() => {
          toast.error("Failed to fetch candidate details.");
        })
        .finally(() => setLoading(false));
    }
  }, [candidateId, reset]);

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // const handleUpdateCandidate = (data: AddCandidateForm) => {
  //   data.evaluatedSkill = skills.join(",");
  //   addPoolCandidateByRecruiter(data)
  //     .then(() => {
  //       toast.success("Candidate updated successfully!");
  //       navigate(
  //         `${organizationEmployeeUrls(
  //           organizationConfig.organization_name
  //         )}/dashboard`
  //       );
  //     })
  //     .catch(() => {
  //       toast.error("Failed to update candidate.");
  //     });
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full my-6">
      <BgDiv>
        <form
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full max-w-3xl  mx-auto p-8"
        >
          <Container>
            <Title order={3}>Candidate Details</Title>
            <Grid gutter="md">
              <Grid.Col span={12}>
                <Controller
                  name="candidateName"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Candidate Name"
                      {...field}
                      error={errors.candidateName?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="contact.email"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      {...field}
                      error={errors.contact?.email?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="contact.phone"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Phone"
                      {...field}
                      error={errors.contact?.phone?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="totalYearsOfExperience"
                  control={control}
                  render={() => (
                    <NumberInput
                      label="Total Experience"
                      // {...field}
                      // min={0}
                      // error={errors.totalYearsOfExperience?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="relevantYearsOfExperience"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Relevant Experience"
                      {...field}
                      min={0}
                      error={errors.relevantYearsOfExperience?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Input.Wrapper label="Skills">
                  <Group>
                    <TextInput
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
                      className="flex-1"
                    />
                    <Button onClick={handleSkillAdd}>Add Skill</Button>
                  </Group>
                </Input.Wrapper>
                <Group mt="md">
                  {skills.map((skill) => (
                    <Chip key={skill} onClick={() => handleSkillRemove(skill)}>
                      {skill} ✖
                    </Chip>
                  ))}
                </Group>
              </Grid.Col>
            </Grid>
          </Container>

          <Group justify="right" mt="lg">
            <Button type="submit">Update Candidate</Button>
          </Group>
        </form>
      </BgDiv>

      <div className="my-8 max-w-4xl mx-auto">
        <Grid>
          {comments.map((comment) => {
            return (
              <Grid.Col
                className="rounded-lg shadow-lg w-full p-8"
                style={{
                  backgroundColor:
                    organizationConfig.organization_theme.theme.backgroundColor,
                  color: organizationConfig.organization_theme.theme.color,
                }}
              >
                <Box>
                  <Box style={{ overflow: "hidden" }}>
                    <Text
                      style={{
                        float: "right",
                        marginLeft: "20px",
                        textAlign: "right",
                      }}
                    >
                      By: {comment.userId?.firstName} {comment.userId?.lastName}
                    </Text>
                    <Text
                      style={{
                        float: "right",
                        marginLeft: "20px",
                        textAlign: "right",
                      }}
                    >
                      Date:{" "}
                      {moment(new Date(comment.updateAt)).format("MMM Do YY")}
                    </Text>
                    <Text
                      style={{
                        float: "right",
                        marginLeft: "20px",
                        textAlign: "right",
                      }}
                    >
                      Duration:{" "}
                      {Math.round(
                        (new Date(comment.callEndsAt).getTime() -
                          new Date(comment.callStartsAt).getTime()) /
                          60000
                      )}{" "}
                      minutes
                    </Text>
                  </Box>

                  <Spoiler
                    showLabel="Show more"
                    maxHeight={100}
                    hideLabel="Hide"
                    c={organizationConfig.organization_theme.theme.color}
                  >
                    {comment.comment}
                  </Spoiler>
                </Box>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>

      <div className="w-full max-w-3xl mx-auto my-6">
        <BgDiv>
          <form
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
            }}
            className="rounded-lg shadow-lg w-full p-8"
          >
            <Grid>
              <Grid.Col span={12}>
                <Controller
                  name="comments"
                  control={control}
                  render={() => <Textarea label="Comment" autosize rows={4} />}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Controller
                  name="comments"
                  control={control}
                  render={() => (
                    <DateTimePicker
                      clearable
                      label="Call Start Time"
                      placeholder="Pick date and time"
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Controller
                  name="comments"
                  control={control}
                  render={() => (
                    <DateTimePicker
                      clearable
                      label="Call End Time"
                      placeholder="Pick date and time"
                    />
                  )}
                />
              </Grid.Col>
            </Grid>
            <Group justify="right" mt="lg">
              <Button>Comment</Button>
            </Group>
          </form>
        </BgDiv>
      </div>
    </div>
  );
};

export default UpdatePoolCandidateForm;
