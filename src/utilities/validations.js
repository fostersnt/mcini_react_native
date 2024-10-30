export const replaceFirstDigitWith233 = phoneNumber => {
  var msisdn = phoneNumber;
  if (phoneNumber.length > 1 && phoneNumber[0] == '0') {
    msisdn = '233' + phoneNumber.slice(1);
  }

  // Replace the first digit with '233'
  console.log('FINAL PHONE NUMBER: ', msisdn);

  return msisdn;
};

export const reduceStringLength = (textLength, text) => {
  return text != null && text.length > textLength
    ? `${text.substring(0, textLength)}...`
    : text;
};

export const validateMsisdn = phoneNumber => {
  phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters

  // Check if the phone number contains any non-digit character
  if (/\D/.test(phoneNumber)) {
    return 'N/A';
  }

  const length = phoneNumber.length;
  if (length === 10) {
    if (/^0[25][34567]\d{7}$/.test(phoneNumber)) {
      let check = phoneNumber.substring(0, 3);
      if (check == '026' || check == '056' || check == '027' || check == '057') {
        return 'AT';
      } else {
        return 'MTN';
      }
    }
  } else if (length === 12) {
    if (/^233[25][34567]\d{7}$/.test(phoneNumber)) {
      let check = phoneNumber.substring(0, 5);
      if (check == '026' || check == '056' || check == '027' || check == '057') {
        return 'AT';
      } else {
        return 'MTN';
      }
    }
  }
  return 'N/A';
};
