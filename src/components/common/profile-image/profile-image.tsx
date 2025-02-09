import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import {
  IconUser,
  IconUpload,
  IconLoader,
  IconCircleDashedCheck,
} from "@tabler/icons-react";
import { OrganizationConfig } from "../../../interfaces/organization";
import { toast } from "react-toastify";
import {
  getProfileImage,
  uploadProfileImage,
} from "../../../services/common-services";
import { useMantineTheme } from "@mantine/core";

interface Props {
  organizationConfig: OrganizationConfig;
}

const ProfileImageUploader: React.FC<Props> = ({ organizationConfig }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const theme = useMantineTheme();

  useEffect(() => {
    setLoading(true);
    getProfileImage()
      .then((response) => {
        const blobUrl = URL.createObjectURL(response);
        setImageUrl(blobUrl);
      })
      .catch((error) => {
        if (error === "NoImage") {
          setImageUrl("");
        } else {
          toast.error("Failed to load profile image.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(newImageUrl);
    }
  };

  const handleUploadImage = () => {
    if (!image) return;

    setLoading(true);
    uploadProfileImage(image)
      .then(() => {
        toast.success("Profile image uploaded successfully!", {
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
        setImage(null);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group w-32 h-32 mx-5 mb-4">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            <IconLoader className="animate-spin text-gray-500" size={40} />
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            <IconUser className="text-gray-500" size={40} />
          </div>
        )}

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
            imageUrl ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          } transition-opacity rounded-lg`}
        >
          <label className="cursor-pointer flex flex-col items-center justify-center">
            <IconUpload className="text-white" size={24} />
            <span className="text-white text-sm">Change Image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {image && (
        <Button onClick={handleUploadImage} className="mt-2">
          <IconUpload size={20} /> Upload Image
        </Button>
      )}
    </div>
  );
};

export default ProfileImageUploader;
