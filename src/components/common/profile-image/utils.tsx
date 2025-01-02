// // Helper function to create an image element from a URL
// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.setAttribute("crossOrigin", "anonymous"); // To avoid cross-origin issues
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.src = url;
//   });

// // Helper function to convert degrees to radians
// export const getRadianAngle = (degreeValue: number): number =>
//   (degreeValue * Math.PI) / 180;

// interface PixelCrop {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// export const getCroppedImg = async (
//   imageSrc: string,
//   pixelCrop: PixelCrop,
//   rotation = 0,
//   imageType: any
// ): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) throw new Error("Canvas 2D context is not available.");

//   const radianRotation = getRadianAngle(rotation);

//   // Get the bounding box of the rotated image
//   const sin = Math.abs(Math.sin(radianRotation));
//   const cos = Math.abs(Math.cos(radianRotation));
//   const newWidth = image.width * cos + image.height * sin;
//   const newHeight = image.width * sin + image.height * cos;

//   // Resize the canvas to accommodate the rotated image
//   canvas.width = newWidth;
//   canvas.height = newHeight;

//   // Translate to center, rotate, and draw the image
//   ctx.translate(newWidth / 2, newHeight / 2);
//   ctx.rotate(radianRotation);
//   ctx.drawImage(
//     image,
//     -image.width / 2,
//     -image.height / 2,
//     image.width,
//     image.height
//   );

//   // Get the cropped area and extract the image data
//   const data = ctx.getImageData(
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   // Resize the canvas to the cropped area
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // Paste the cropped image data onto the resized canvas
//   ctx.putImageData(data, 0, 0);

//   // Return the cropped image as a Blob URL
//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       if (blob) {
//         resolve(URL.createObjectURL(blob));
//       }
//     }, imageType);
//   });
// };
