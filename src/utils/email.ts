import nodemailer from "nodemailer";
import { ENV_VARS } from "@/common/constants/envs";

const pug = require("pug");
const htmlToText = require("htmlToText");

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Jonas Schmedtmann <${ENV_VARS.EMAIL_FROM}>`;
  }

  newTransport() {
    if (ENV_VARS.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: ENV_VARS.SENDGRID_USERNAME,
          pass: ENV_VARS.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: ENV_VARS.EMAIL_HOST,
      port: ENV_VARS.EMAIL_PORT,
      auth: {
        user: ENV_VARS.EMAIL_USERNAME,
        pass: ENV_VARS.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)",
    );
  }
}
