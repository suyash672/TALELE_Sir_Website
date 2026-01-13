import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { fullName, email, message } = req.body || {};

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587/other
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO ,
      subject: `New message from portfolio contact form - ${fullName}`,
      replyTo: email,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

