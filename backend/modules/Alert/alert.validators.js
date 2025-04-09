const yup = require("yup");

const addAlertValidator = yup.object().shape({
	price: yup.number().required("قیمت هدف برای کوین اجباری است!"),
});

module.exports = { addAlertValidator };
