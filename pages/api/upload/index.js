import multer from "multer";
import path from "path";
import fs from "fs";

// Disable body parsing to allow multer to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Setup Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public", "images");

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Middleware to handle single file upload
const uploadMiddleware = upload.single("image");

// Next.js API Route handler
const handler = async (req, res) => {
  // Ensure it's a POST request
  if (req.method === "POST") {
    // Use multer middleware to handle the image upload
    uploadMiddleware(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        return res.status(400).json({ success: false, message: err.message });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ success: false, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      // If successful, respond with the file's path
      res.status(200).json({
        success: true,
        filePath: `/images/${req.file.filename}`,
      });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
};

export default handler;
