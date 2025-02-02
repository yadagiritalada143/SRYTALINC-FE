import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Grid,
  NumberInput,
  TextInput,
  Group,
  Chip,
  Flex,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  AddCandidateForm,
  candidateSchema,
} from "../../../../forms/add-candidate";
import { BgDiv } from "../../../common/style-components/bg-div";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { toast } from "react-toastify";
import { addPoolCandidateByRecruiter } from "../../../../services/user-services";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMantineTheme } from "@mantine/core";
import { organizationEmployeeUrls } from "../../../../utils/common/constants";

const AddPoolCandidate = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const {
    control,
    formState: { errors, isLoading },
    getValues,
  } = useForm<AddCandidateForm>({ resolver: zodResolver(candidateSchema) });
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const onSubmit = () => {
    const formData = getValues();
    formData.evaluatedSkill = skills.join(",");
    addPoolCandidateByRecruiter(formData)
      .then(() => {
        toast("Candidate added successfully !", {
          style: {
            color: theme.colors.primary[2],
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          },
          progressStyle: {
            background: theme.colors.primary[8],
          },
          icon: <IconCircleDashedCheck width={32} height={32} />,
        });
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/dashboard`
        );
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <Card shadow="sm" radius="md" className="max-w-2xl mx-auto my-6">
      <BgDiv>
        <form
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full max-w-4xl p-8"
        >
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
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
            <Grid.Col span={{ base: 12, sm: 6 }}>
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
            <Grid.Col span={{ base: 12, sm: 6 }}>
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
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="totalYearsOfExperience"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Total Experience"
                    {...field}
                    error={errors.totalYearsOfExperience?.message}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="relevantYearsOfExperience"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Relevant Experience"
                    {...field}
                    error={errors.relevantYearsOfExperience?.message}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col>
              <Flex gap="md">
                <TextInput
                  label="Skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
                />
                <Button className="self-end" onClick={handleSkillAdd}>
                  Add Skill
                </Button>
              </Flex>
              <Group mt="md">
                {skills.map((skill) => (
                  <Chip key={skill} onClick={() => handleSkillRemove(skill)}>
                    {skill} ✖
                  </Chip>
                ))}
              </Group>
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" className="my-6">
            <Button onClick={onSubmit}>
              {isLoading ? "Adding" : "Add Candidate"}
            </Button>
          </Group>
        </form>
      </BgDiv>
    </Card>
  );
};

export default AddPoolCandidate;
