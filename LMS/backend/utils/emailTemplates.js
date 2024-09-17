const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            width: 100px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            background-color: #f4f4f4;
            padding: 10px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .button-container {
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Email Verification</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up! To complete the registration process, please verify your email address by entering the verification code below:</p>
            <div class="code">
                {{ verificationCode }}
            </div>
            <p>If you didn’t request this email, you can safely ignore it.</p>
        </div>
        <div class="button-container">
            <a href="#" class="button">Verify Your Email</a>
        </div>
        <div class="footer">
            <p>If the button doesn't work, please use the verification code above.</p>
            <p>Thank you for using our service!</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
};
