import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class HelperService {
  async sendPrincipalWelcomeEmail(
    email: string,
    tempPassword: string,
    name: string,
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password`;

    const mailOptions = {
      from: 'Studify <no-reply@levelup.com>',
      to: email,
      subject: 'Welcome to Studify - Your Account Details',
      text: `Hi ${name},

Your account as a school principal has been created on Studify.

Your temporary password is: ${tempPassword}

Please log in using this password and change it as soon as possible for your security.

If you did not expect this email, you can safely ignore it.

Best regards,
The Studify Team
`,
      html: `
<div style="font-family: Arial, sans-serif; color: #222; text-align: center; padding: 32px 0;">
  <h2 style="margin-bottom: 24px;">Welcome to Studify</h2>
  <p style="font-size: 16px;">Hi ${name},</p>
  <p style="font-size: 16px; margin-bottom: 24px;">
    Your account as a <b>school principal</b> has been created on <b>Studify</b>.
  </p>
  <p style="font-size: 16px;">Your temporary password is:</p>
  <div style="display: inline-block; background: #f3f4f6; border: 2px solid #4f46e5; color: #1e293b; font-size: 20px; font-weight: bold; padding: 12px 32px; border-radius: 6px; margin-bottom: 24px;">
    ${tempPassword}
  </div>
  <p style="font-size: 16px; margin-top: 24px;">
    Please log in using this password and change it as soon as possible for your security.
  </p>
  <p style="font-size: 16px; margin-top: 16px;">Reset Password link: ${resetLink}</p>
  <p style="font-size: 15px; color: #555; margin-top: 32px;">
    If you did not expect this email, you can safely ignore it.
  </p>
  <br>
  <p style="font-size: 15px; color: #555;">Best regards,<br><b>The Studify Team</b></p>
</div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }

  async sendResetPasswordEmail(email: string, name: string, token: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
      from: `"Support Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>Hello, ${name}!</p>
        <p>We received a request to reset your account password.</p>
        <p>To create a new password, please click the link below:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>Support Team</p>
      `,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}
