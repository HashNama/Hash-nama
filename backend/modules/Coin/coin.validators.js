const yup = require("yup");

const addCoinValidator = yup.object().shape({
	symbol: yup
		.string()
		.required("سمبل اجباریست")
		.min(1, "سمبل نمیتواند کمتر از 1 حرف باشد")
		.max(6, "سمبل نمیتواند بیشتر از 6 حرف باشد"),
	name: yup.string().required("اسم اجباریست"),
});

module.exports = { addCoinValidator };
