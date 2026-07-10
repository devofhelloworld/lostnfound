const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const isCloudinaryConfigured = () => {
  return !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
};

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      console.warn('WARNING: Cloudinary credentials are not configured in .env. Image upload skipped.');
      return resolve('');
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'lostnfound' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

module.exports = {
  upload,
  uploadToCloudinary
};
