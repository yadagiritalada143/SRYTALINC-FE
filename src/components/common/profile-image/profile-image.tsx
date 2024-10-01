import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button, Modal, Slider } from "@mantine/core";
import {
  IconUser,
  IconUpload,
  IconRotate,
  IconLoader,
} from "@tabler/icons-react";
import { getCroppedImg } from "./utils";

const ProfileImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCropModal, setShowCropModal] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const uploadCroppedImage = async () => {
    if (!imageSrc || !croppedArea) return;
    try {
      setLoading(true);
      const croppedImg = await getCroppedImg(imageSrc, croppedArea, rotation);
      setCroppedImage(croppedImg);
      setLoading(false);
      setShowCropModal(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleUploadImage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col ">
      <div className="relative group w-32 h-32 mx-5 mb-4">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
            <IconLoader className="animate-spin text-gray-500" size={40} />
          </div>
        ) : croppedImage ? (
          <img
            src={croppedImage}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
            <IconUser className="text-gray-500" size={40} />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
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

      {imageSrc && (
        <label htmlFor="file-upload" className="cursor-pointer">
          <Button onClick={handleUploadImage}>
            <IconUpload size={20} /> Upload New Image
          </Button>
        </label>
      )}

      <Modal
        opened={showCropModal}
        onClose={() => setShowCropModal(false)}
        title="Edit Image"
        size="lg"
      >
        <div className="relative w-full h-60">
          <Cropper
            image={imageSrc!}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            rotation={rotation}
          />
        </div>

        <div className="my-4">
          <span>Zoom</span>
          <Slider
            value={zoom}
            onChange={setZoom}
            min={1}
            max={3}
            step={0.1}
            label={(val) => `${val.toFixed(1)}x`}
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button onClick={() => setRotation((prev) => prev + 90)}>
            <IconRotate size={20} />
            Rotate
          </Button>
          <Button variant="filled" onClick={uploadCroppedImage}>
            Crop & Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImageUploader;
