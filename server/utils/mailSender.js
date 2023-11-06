import nodemailer from "nodemailer";

const sendMail = async (email, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    //SENDING MAIL
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: message,
    });

    console.log("CHECKING EMAIL");
  } catch (error) {
    console.log("Error in sendEmail.js");
    console.log(error);
    console.log(error.message);
  }
};

export default sendMail;
