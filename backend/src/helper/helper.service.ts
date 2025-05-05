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
      from: 'Level Up Educational <no-reply@levelup.com>',
      to: email,
      subject: 'Welcome to Level Up Educational - Your Account Details',
      text: `Hi ${name},

Your account as a school principal has been created on Level Up Educational.

Your temporary password is: ${tempPassword}

Please log in using this password and change it as soon as possible for your security.

If you did not expect this email, you can safely ignore it.

Best regards,
The Level Up Educational Team
`,
      html: `
<div style="font-family: Arial, sans-serif; color: #222; text-align: center; padding: 32px 0;">
  <h2 style="margin-bottom: 24px;">Welcome to Level Up Educational</h2>
  <p style="font-size: 16px;">Hi ${name},</p>
  <p style="font-size: 16px; margin-bottom: 24px;">
    Your account as a <b>school principal</b> has been created on <b>Level Up Educational</b>.
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
  <p style="font-size: 15px; color: #555;">Best regards,<br><b>The Level Up Educational Team</b></p>
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
}
