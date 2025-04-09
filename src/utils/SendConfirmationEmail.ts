import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
export const sendConfirmationMail = async (
  email: string,
  status: string,
  day: Date,
  timeSlot: string
) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "ashpatil454@gmail.com",
        pass: "sefn tnnf otdn lgzl",
      },
    });

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Status</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            background-color: #4285f4;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f1f1f1;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
        .button {
            display: inline-block;
            background-color: #4285f4;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            font-weight: bold;
        }
        .credentials {
            background-color: #f9f9f9;
            border: 1px solid #dddddd;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        h1 {
            margin: 0;
            color: #ffffff;
        }
        h2 {
            color: #4285f4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Appointment Status</h1>
        </div>
        <div class="content">
            <h2>Appointment Status</h2>
            <p>Hello,</p>
            <p>Here are the Appointment status you requested:</p>
            
            <div class="credentials">
                <p>The appointment status is: the doctor has ${status} your appointment on ${day} during the ${timeSlot} time slot. </p>
               
            </div>
            
            <p>Please store these credentials securely and do not share them with anyone else.</p>
            
            <p>If you didn't request this information, please contact us immediately.</p>
            
            <a href="https://localhost:4200/login" class="button">Access Your Account</a>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
    const mailOptions: MailOptions = {
      from: "ashpatil454@gmail.com",
      to: email,

      subject: "Sharing your password",
      html: htmlContent,
    };
    const sendMail = await transporter.sendMail(mailOptions);
    console.log("Mail send to", sendMail.messageId);
  } catch (error) {
    console.log(error);
  }
};

// sendMail("aabidmahat95@gmail.com", "aabid");
