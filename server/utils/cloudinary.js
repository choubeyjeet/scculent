const cloudinaryUploadImage = async (fileToUpload, folderName) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      folder: `${folderName}`,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryDeleteImage = async () => {};

module.exports = { cloudinaryUploadImage };
