import nodemailer from "nodemailer";

export const handleContactForm = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'hotmail', 'outlook'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Super 60 Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "New Contact Request from Super 60 Website",
      html: `
    <h2>📩 Super 60 Website - Contact Form Submission</h2>
    <p>You have received a new inquiry via the contact form. Below are the details:</p>
    <hr>
    <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email Address:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber || "Not provided"}</p>
    <p><strong>Message:</strong></p>
    <blockquote>${message}</blockquote>
    <hr>
    <p>This is an automated message from the Super 60 website. Please respond promptly if action is required.</p>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
};