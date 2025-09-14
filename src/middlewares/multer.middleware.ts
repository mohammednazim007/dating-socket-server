import multer from "multer";

// configure storage
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "../public"); // ensure folder exists
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
