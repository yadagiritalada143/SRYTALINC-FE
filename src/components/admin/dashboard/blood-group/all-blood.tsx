import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Group,
  ActionIcon,
  Text,
  Loader,
  Pagination,
  Modal,
  Box,
  TextInput,
  Card,
  Title,
  Container,
} from "@mantine/core";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import {
  getAllBloodGroupByAdmin,
  addBloodGroupByAdmin,
  updateBloodGroupByAdmin,
  deleteBloodGroupByAdmin,
} from "../../../../services/admin-services";

const BloodGroupTable = () => {
  const [bloodGroups, setBloodGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  // Fetch blood groups on mount
  useEffect(() => {
    fetchBloodGroups();
  }, []);

  const fetchBloodGroups = async () => {
    setLoading(true);
    try {
      const data = await getAllBloodGroupByAdmin();
      setBloodGroups(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch blood groups");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (group: any) => {
    setSelectedGroup(group);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedGroup({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    setIsUpdating(true);
    try {
      await updateBloodGroupByAdmin();
      toast.success("Blood group updated successfully");
      fetchBloodGroups();
      closeEditModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update blood group");
    } finally {
      setIsUpdating(false);
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBloodGroupByAdmin();
      toast.success("Blood group deleted successfully");
      fetchBloodGroups();
      closeDeleteModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete blood group");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle add blood group
  const handleAdd = async () => {
    setIsAdding(true);
    try {
      await addBloodGroupByAdmin({ type: newGroupName });
      toast.success("Blood group added successfully");
      fetchBloodGroups();
      closeAddModal();
      setNewGroupName("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add blood group");
    } finally {
      setIsAdding(false);
    }
  };

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(bloodGroups.length / itemsPerPage);
  const paginatedData = bloodGroups.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container size="lg" py="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {/* Header */}
        <Group justify="space-between" mb="md">
          <Title order={2}>Blood Group Management</Title>
          <Button
            onClick={openAddModal}
            variant="filled"
            color="blue"
            leftSection={<IconPlus size={20} />}
          >
            Add New Blood Group
          </Button>
        </Group>

        {/* Loading State */}
        {loading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Loader size="lg" />
          </Box>
        ) : (
          <>
            {/* Table */}
            <Table striped highlightOnHover verticalSpacing="sm">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((group) => (
                  <tr key={group.id}>
                    <td style={{ textAlign: "center" }}>{group.type}</td>
                    <td style={{ textAlign: "center" }}>
                      <Group gap="xs" justify="center">
                        <ActionIcon
                          color="blue"
                          onClick={() => handleEdit(group)}
                          title="Edit"
                        >
                          <IconEdit size={20} />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          onClick={() => handleDelete(group.id)}
                          title="Delete"
                        >
                          <IconTrash size={20} />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {totalPages > 1 && (
              <Pagination
                total={totalPages}
                value={activePage}
                onChange={setActivePage}
                mt="md"
              />
            )}
          </>
        )}
      </Card>

      <Modal
        opened={addModalOpened}
        onClose={closeAddModal}
        title="Add New Blood Group"
        centered
      >
        <Box>
          <TextInput
            label="Blood Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter blood group name"
            required
            mb="md"
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={closeAddModal}>
              Cancel
            </Button>
            <Button onClick={handleAdd} loading={isAdding}>
              Add
            </Button>
          </Group>
        </Box>
      </Modal>

      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title="Edit Blood Group"
        centered
      >
        <Box>
          <TextInput
            label="Blood Group Name"
            value={selectedGroup?.type || ""}
            onChange={(e) =>
              setSelectedGroup({ ...selectedGroup, type: e.target.value })
            }
            required
            mb="md"
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button onClick={confirmEdit} loading={isUpdating}>
              Save Changes
            </Button>
          </Group>
        </Box>
      </Modal>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
        centered
      >
        <Text size="sm">Are you sure you want to delete this blood group?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={confirmDelete} loading={isDeleting}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default BloodGroupTable;
