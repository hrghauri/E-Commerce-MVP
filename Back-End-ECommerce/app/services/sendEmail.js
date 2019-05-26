const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const emailSecrets = require('./emailSecrets');

const _generateHTMLForItemQuantities = itemsBought => {
  let total = 0;

  const html = itemsBought.reduce((acc, currentItem) => {
    const currentProductPrice = currentItem.quantityBought * currentItem.price;
    total = currentProductPrice + total;

    acc =
      acc +
      `<br><span>   ${currentItem.title}               ${
        currentItem.quantityBought
      } 'x $'${currentItem.price} = $${currentProductPrice}  </span>`;
    return acc;
  }, '');

  return html + `<br><span>     Total:   $${total}</span>`;
};

const sendEmail = async (orderId, customerEmail, serverTime, itemsBought) => {
  try {
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
      emailSecrets.clientId,
      emailSecrets.clientSecret,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: emailSecrets.refreshToken
    });

    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'harisghauritest@gmail.com',
        clientId: emailSecrets.clientId,
        clientSecret: emailSecrets.clientSecret,
        refreshToken: emailSecrets.refreshToken,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: 'harisghauritest@gmail.com',
      to: customerEmail,
      bcc: 'hrghauri@gmail.com',
      subject: `Your order ${orderId} has been received`,
      generateTextFromHTML: true,
      html:
        `Your Order <b>${orderId}</b> was received at ${serverTime} <br>` +
        _generateHTMLForItemQuantities(itemsBought)
    };

    const response = await smtpTransport.sendMail(mailOptions);
    smtpTransport.close();
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  sendEmail
};
