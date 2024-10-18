export const replaceFirstDigitWith233 = (phoneNumber) => {
    var msisdn = phoneNumber;
    if (phoneNumber.length > 1 && phoneNumber[0] == '0') {
        msisdn = '233' + phoneNumber.slice(1);
    }
    
    // Replace the first digit with '233'
    console.log('FINAL PHONE NUMBER: ', msisdn);
    
    return msisdn;
}

export const reduceStringLength = (textLength, text) => {
    return text != null && text.length > textLength ? `${text.substring(0, textLength)}...` : text;
  };