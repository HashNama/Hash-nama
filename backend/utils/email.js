const nodemailer = require("nodemailer");
const configs = require("./../configs");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: configs.email.user,
		pass: configs.email.pass,
	},
});

const generateAlertEmailTemplate = (symbol, price, dir, target) => {
	return `
    <div style="font-family: Arial; padding: 20px;">
        <h2>📉 هشدار قیمت ${symbol}</h2>
        <p>قیمت ${symbol} اکنون به <strong>${price}$</strong> رسیده است.</p>
        <p>هشدار قیمتی که تنظیم کرده بودید برای ${
			dir === "above" ? "بالای" : "پایین"
		} ${target}$ فعال شد ✅</p>
        <br>
        <p style="font-size: 12px; color: gray;">هشدار توسط HashNama</p>
    </div>
    `;
};

const sendAlertEmail = async (
	to,
	symbol,
	currentPrice,
	direction,
	targetPrice
) => {
	const mailOption = {
		from: `"HashNama Alerts" ${configs.email.user}`,
		to,
		subject: `🚨 هشدار قیمت ${symbol}`,
		html: generateAlertEmailTemplate(
			symbol,
			currentPrice,
			direction,
			targetPrice
		),
	};

	try {
		await transporter.sendMail(mailOption);
		return true;
	} catch (err) {
		return false;
	}
};
