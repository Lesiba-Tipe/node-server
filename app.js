const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

//app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
});

// Handle form submission..
app.post('/send-review', (req, res) => {
  const { fullname, email, subject, body, domain } = req.body;

  let reciepent_email = ''
  let reciepent_name = ''
  let sender = 'lesibamoshweu@gmail.com'

  switch(domain){
    case 'rakgadieatery.tipegraphics.co.za':
      reciepent_email = 'chyner.za@gmail.com'   //Change this to website owner's email
      reciepent_name = "Rakgadi"
      break;
    default:
      reciepent_email = 'tipegraphics@gmail.com'
      reciepent_name = "Lesiba"
  } 

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
    from: sender,
    to: reciepent_email,
    subject: subject,
    text: 'Hi ' + reciepent_name + ',\n\n' + body + '\n\nRegards:\n' + fullname + ' ['+email+']',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
      //Redirect to 404 link
    }
    console.log('Email sent: ' + info.response);
    res.send('Form submitted successfully!');
    //Redirect to success
  });
});

//Serve Youth Cafe data

app.get('/api/youthcafe', (req, res) => res.sendFile(__dirname + '/Database/Youthcafe.json'))

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});