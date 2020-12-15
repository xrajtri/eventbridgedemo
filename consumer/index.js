const AWS = require('aws-sdk');
const SES = new AWS.SES();
const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;

function sendEmail(emailData){
    const emailParams = {
        Source: FROM_EMAIL,
        ReplyToAddresses: ["rajantrivedi1@gmail.com"],
        Destination: {
            ToAddresses: [TO_EMAIL],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `Dear ${emailData.name}, Please find your message: ${emailData.message}`
                },
            },
            Subject:{
                Charset: 'UTF-8',
                Data: 'New Message received!'
            },
        },
    };

    console.log(emailParams);
    const promise = SES.sendEmail(emailParams).promise();
    console.log(promise);
    return promise
}

exports.case1Handler = async (event) => {
    console.log('--- Approved transactions ---')
    console.log(JSON.stringify(event, null, 2));
    console.log("Sending Email...");
    const emailData = {
        name: "Rajan",
        message: "New loan created!"
    }
    return sendEmail(emailData).then(data => {
        console.log("Data = "+data);
    }).catch(error =>{
        console.log(error);
    });
  }
  
  exports.case2Handler = async (event) => {
    console.log('--- NY location transactions ---')
    console.log(JSON.stringify(event, null, 2))
  }
  
  exports.case3Handler = async (event) => {
    console.log('--- Unapproved transactions ---')
    console.log(JSON.stringify(event, null, 2))
  }
  