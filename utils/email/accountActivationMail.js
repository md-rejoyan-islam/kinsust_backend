const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // host name
  port: process.env.SMTP_HOST, // host port number
  auth: {
    user: process.env.EMAIL_HOST_USER, // email address
    pass: process.env.EMAIL_HOST_PASSWORD, // email password
  },
});

const sendAccountVerifyMail = async (emailData) => {
  try {
    const { code } = emailData;
    const mailInfo = {
      from: `Activation Code <${process.env.EMAIL_HOST_USER}>`, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: `
     <body><main style="min-height:100vh;padding:25px 6px;background-color:#f7f8fe;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif"><div style="margin:auto;width:fit-content"><div style="max-width:500px"><figure style="margin:auto;text-align:center"><img src="https://github.com/KINSUST/image/blob/main/kin-logo.png?raw=true" alt="" style="width:140px"></figure></div><div class="main-container" style="max-width:500px;background-color:#fff;border:1px solid #bab9b9;padding:15px;border-radius:5px"><div class="mail-header"></div><div class="mail-body" style="font-size:18px"><p style="text-align:center;margin:0;padding-bottom:8px;font-size:20xp;font-weight:600">KIN Account Activation Code</p><p style="margin:0;padding:4px;text-align:justify;font-size:15px">We received a request to create a account.To verify your email address, please use the following verification code:</p><p style="text-align:center"><span style="margin:0;font-size:25px;font-weight:900;letter-spacing:6px">${code}</span></p><p style="margin:0;padding:4px;font-size:15px">Thanks,<br><span style="font-family:Arial #000;color:red">KIN</span> A Voluntary Organization,<span style="font-weight:700">SUST</span></p></div></div></div></main></body>

     `,
    };

    const info = await transport.sendMail(mailInfo);
  } catch (error) {
    console.log("Message sent failed!");
    console.log(error);
  }
};
module.exports = sendAccountVerifyMail;
