const { mailtrapClient, sender } = require("./mailTrap.config");
const { VERIFICATION_EMAIL_TEMPLATE } = require("../utils/emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      category: "Email verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{{ verificationCode }}",
        verificationToken
      ),
    });

    console.log("Email sent");
  } catch (error) {
    console.log("Error with sending email", error);
  }
};

module.exports = {
  sendVerificationEmail,
};
