const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploader = (destination, allowedFormats) => {
	if (!fs.existsSync(destination)) {
		fs.mkdirSync(destination, { recursive: true });
	}

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, destination);
		},
		filename: (req, file, cb) => {
			const extName = path.extname(file.originalname);
			const fileName = path.basename(file.originalname, extName);
			cb(null, `${fileName}-${Date.now()}${extName}`);
		},
	});

	const fileFilter = (req, file, cb) => {
		if (!allowedFormats.includes(file.mimetype)) {
			return cb(new Error("فرمت فایل معتبر نیست"), false);
		}
		cb(null, true);
	};

	return multer({
		storage,
		fileFilter,
		limits: { fileSize: 24_000_000 },
	});
};

module.exports = uploader;
