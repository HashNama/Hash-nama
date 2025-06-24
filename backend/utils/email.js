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
	return `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>Price Alert Triggered</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css"></style></head><body style="word-spacing: normal; background-color: #000000;"><div style="background-color:#000000;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#1a1a1a" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#1a1a1a;background-color:#1a1a1a;margin:0px auto;border-radius:12px;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#1a1a1a;background-color:#1a1a1a;width:100%;border-radius:12px;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:24px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:552px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;font-weight:600;line-height:1;text-align:left;color:#ffffff;">Price Alert Triggered</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#cccccc;">Your alert for <span class="highlight" style="color: #00c896; font-weight: bold;">${symbol}</span> has been triggered.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#cccccc;">Current Price: <span class="highlight" style="color: #00c896; font-weight: bold;">${price}</span><br>Your Target: <span class="highlight" style="color: #00c896; font-weight: bold;">${target}</span></div></td></tr><tr><td align="center" style="font-size:0px;padding:16px 0;word-break:break-word;"><p style="border-top:solid 4px #333333;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #333333;font-size:1px;margin:0px auto;width:552px;" role="presentation" width="552px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:16px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:12px;line-height:1;text-align:left;color:#666666;">You are receiving this alert based on your preferences. To manage your alerts, please visit your profile settings.</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;
};

const generateOtpEmailTemplate = (code) => {
	return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
          Verify Your Code
        </title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }
        </style>
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        
        
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }
    </style>
    
  
        <style type="text/css">
        
        
        </style>
        <style type="text/css">body {
        background-color: #111;
      }</style>
        
      </head>
      <body style="background-color:#111111;">
        
        
      <div
         style="background-color:#111111;"
      >
        
      
      <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    
      
      <div  style="margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"
              >
                <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
            
      <div
         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
      >
        
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
      >
        
            <tr>
              <td
                 align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <div
         style="font-family:Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#fcd535;"
      >Verify Your Email</div>
    
              </td>
            </tr>
          
            <tr>
              <td
                 align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <div
         style="font-family:Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#cccccc;"
      >Your verification code is:</div>
    
              </td>
            </tr>
          
            <tr>
              <td
                 align="center" style="font-size:0px;padding:10px 0;word-break:break-word;"
              >
                
      <div
         style="font-family:Helvetica, Arial, sans-serif;font-size:32px;font-weight:bold;line-height:1;text-align:center;color:#ffffff;"
      >${code}</div>
    
              </td>
            </tr>
          
            <tr>
              <td
                 align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <div
         style="font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#aaaaaa;"
      >This code will expire in 2 minutes.</div>
    
              </td>
            </tr>
          
            <tr>
              <td
                 style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <p
         style="border-top:solid 4px #333333;font-size:1px;margin:0px auto;width:100%;"
      >
      </p>
      
      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #333333;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
    
    
              </td>
            </tr>
          
            <tr>
              <td
                 align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <div
         style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:1;text-align:center;color:#555555;"
      >If you didn't request this code, please ignore this message.</div>
    
              </td>
            </tr>
          
      </table>
    
      </div>
    
          <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
    
    
      </div>
    
      </body>
    </html>
  `;
};

const generateRecoveryPasswordEmail = (link) => {
	return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Reset Your Password</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #111;
        font-family: Helvetica, Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        background-color: #1a1a1a;
        color: #ffffff;
        text-align: center;
        border-radius: 8px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #fcd535;
        margin-bottom: 10px;
      }
      .text {
        font-size: 16px;
        color: #cccccc;
        margin-bottom: 30px;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background-color: #fcd535;
        color: #111;
        text-decoration: none;
        font-weight: bold;
        border-radius: 6px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #555555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">Reset Your Password</div>
      <div class="text">Click the button below to reset your password. This link is valid for 5 minutes.</div>
      <a class="btn" href="${link}" target="_blank">Reset Password</a>
      <div class="footer">
        If you didn’t request this password reset, you can safely ignore this email.
      </div>
    </div>
  </body>
</html>
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
		subject: `🚨 Price Alert ${symbol}`,
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

const sendOtpEmail = async (to, code) => {
	const mailOption = {
		from: `"HashNama Auth System" ${configs.email.user}`,
		to,
		subject: `One Time Password`,
		html: generateOtpEmailTemplate(code),
	};

	try {
		await transporter.sendMail(mailOption);
		return true;
	} catch (err) {
		return false;
	}
};

const sendRecoveryPasswordEmail = async (to, link) => {
	const mailOption = {
		from: `"HashNama Auth System" ${configs.email.user}`,
		to,
		subject: `Recovery Password`,
		html: generateRecoveryPasswordEmail(link),
	};

	try {
		await transporter.sendMail(mailOption);
		return true;
	} catch (err) {
		return false;
	}
};

module.exports = { sendAlertEmail, sendOtpEmail, sendRecoveryPasswordEmail };
