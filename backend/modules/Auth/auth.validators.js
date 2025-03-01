const yup = require("yup");

const registerValidator = yup.object().shape({
	username: yup
		.string()
		.required("نام کاربری اجباریست")
		.min(3, "نام کاربری نمیتواند کمتر از 3 حرف باشد")
		.max(36, "نام کاربری نمیتواند بیشتر از 36 حرف باشد"),
	email: yup.string().required("ایمیل اجباریست").email("ایمیل نا معتبر است"),
	password: yup
		.string()
		.min(8, "رمز عبور حداقل باید 8 کارکتر باشد")
		.max(48, "رمز عبور حداکثر میتواند 48 کارکتر باشد"),
});

const loginValidator = yup.object().shape({
	email: yup.string().required("ایمیل اجباریست").email("ایمیل نا معتبر است"),
	password: yup
		.string()
		.min(8, "رمز عبور حداقل باید 8 کارکتر باشد")
		.max(48, "رمز عبور حداکثر میتواند 48 کارکتر باشد"),
});

module.exports = { registerValidator, loginValidator };
