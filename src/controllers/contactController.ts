import  { Request, Response } from 'express';
import nodemailer from 'nodemailer';


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

 const contactUsSection = async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    try {
      // Send email
      await transporter.sendMail({
        from: 'test@example.com',
        to: process.env.EMAIL_USER,
        subject: 'Test Email',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });
  
      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error); 
      res.status(500).json({ success: false, message: 'Failed to send message' });
    }
  }

export default contactUsSection;
