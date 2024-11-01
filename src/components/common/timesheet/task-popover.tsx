import { useDisclosure } from "@mantine/hooks";
import { Popover, Text } from "@mantine/core";

export const TaskPopover = ({ task }: { task: string }) => {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover opened={opened}>
      <Popover.Target>
        <Text onMouseEnter={open} onMouseLeave={close}>
          {task.slice(0, 12)}
        </Text>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: "none" }}>
        <Text size="sm">{task}</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
