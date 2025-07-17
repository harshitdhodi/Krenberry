const Newsletter = require('../model/newsletter');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});


exports.addEmail = async (req, res) => {
    try {
        const { email,name } = req.body;

        // Check if the email already exists
        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newEmail = new Newsletter({ email,name });
        await newEmail.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Newsletter Subscription Confirmation',
            html: `
<div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 40px 0;">
  <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header with logo and title -->
    <tr>
      <td style="background-color: #ec2127; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 22px; margin: 10px 0 0;">Krenberry Newsletter</h1>
      </td>
    </tr>

    <!-- Body content -->
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; color: #333333;">Hi ${name || 'there'},</p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6;">
          Thank you for subscribing to <strong>Krenberry</strong>! We're thrilled to have you on board.
          You'll now receive our latest updates, news, and exclusive offers straight to your inbox.
        </p>
        <p style="font-size: 16px; color: #333333; line-height: 1.6;">
          Stay tuned — exciting things are coming your way!
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://krenberry.com" style="background-color: #39B54A; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; display: inline-block;">
            Visit Our Website
          </a>
        </div>

        <p style="font-size: 14px; color: #999999; text-align: center;">
          If you didn't subscribe, you can safely ignore this email.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F7F4EE; padding: 20px 30px; text-align: center; font-size: 13px; color: #999999;">
        &copy; ${new Date().getFullYear()} Krenberry. All rights reserved.<br>
      </td>
    </tr>
  </table>
</div>
            `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send confirmation email', error });
            } else {
                res.status(201).json({ message: 'Email subscribed successfully and confirmation sent', data: newEmail });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET: Retrieve all subscribed emails
exports.getAllEmails = async (req, res) => {
    try {
        const emails = await Newsletter.find();
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE: Remove an email from the newsletter by ID
exports.deleteEmail = async (req, res) => {
    try {
        const { id } = req.query;

        const deletedEmail = await Newsletter.findByIdAndDelete(id);
        if (!deletedEmail) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json({ message: 'Email unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
