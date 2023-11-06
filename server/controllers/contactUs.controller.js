import sendMail from "../utils/mailSender.js";

const contactUsMessage = async (req, res) => {
  const { fullName, email, contactNumber, message } = req.body;
  if (!fullName || !email || !contactNumber || !message) {
    return res.status(404).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const subject = "Contact us message";
    const textMessage = `Message from ${fullName} - ${email} <br/> Message : ${message} <br/> Contact me on -> ${contactNumber} `;

    await sendMail(process.env.CONTACT_US_EMAIL, subject, textMessage);

    return res.status(200).json({
      success: true,
      message: "Message send successfully - We contact with you ASAP😊",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default contactUsMessage;
