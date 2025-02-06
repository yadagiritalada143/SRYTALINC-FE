import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export const SearchBarFullWidht = ({
  search,
  handleSearch,
}: {
  search: string;
  handleSearch: any;
}) => {
  return (
    <div className="w-full my-2">
      <TextInput
        placeholder="Search by Name, Email, or Phone"
        rightSection={<IconSearch />}
        value={search}
        onChange={handleSearch}
        className="my-4"
      />
    </div>
  );
};
