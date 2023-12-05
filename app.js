const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse incoming form data
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, subject, body } = req.body;

  console.log('Name:',req.body)
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lesibamoshweu@gmail.com',
      pass: 'mvlpuoefuoklondo',
    },
  });

  // Set up email options
  const mailOptions = {
    from: 'lesibamoshweu@gmail.com',
    to: 'tipegraphics@gmail.com',
    subject: subject,
    text: 'Hi Lesiba,\n\n' + body + '\n\nRegards:\n' + name + ' ['+email+']',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
    }
    console.log('Email sent: ' + info.response);
    res.send('Form submitted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

