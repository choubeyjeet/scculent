const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
// console.log(path.join(__dirname, "..", "views/welcome.ejs"));

const sendEmail = async ({
  type,
  emails,
  subject,
  username,
  websiteURL,
  resetUrl,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
    switch (type) {
      case "register":
        ejs.renderFile(
          path.join(__dirname, "..", "views/welcome.ejs"),
          {
            username,
            title,
            websiteURL,
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let mailOptions = {
                from: process.env.NODE_MAILER_EMAIL,
                to: emails,
                subject: subject,
                html: data,
              };
              transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                  console.log(err);
                }
                console.log("Email send successful. ", data.messageId);
              });
            }
          }
        );
        break;
      case "reset":
        ejs.renderFile(
          path.join(__dirname, "..", "views/forgetTemplate.ejs"),
          {
            username,
            resetUrl,
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let mailOptions = {
                from: process.env.NODE_MAILER_EMAIL,
                to: emails,
                subject: subject,
                html: data,
              };
              transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                  console.log(err);
                }
                console.log("Email send successful. ", data.messageId);
              });
            }
          }
        );
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
