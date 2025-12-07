import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "mihirsingh8383@gmail.com",
    pass: "ylaq cebh tgft smpz", 
  },
  tls: { rejectUnauthorized: false },
});

const SendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Raghuvanshi" <mihirsingh8383@gmail.com>',
      to: "mihirsingh838383@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log(info);
  } catch (error) {
    console.error("❌ Email Sending Failed!");
    console.error(error);
  }
};

SendEmail();



