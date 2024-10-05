export const replaceFirstDigitWith233 = (phoneNumber) => {
    var msisdn = 'n/a';
    if (phoneNumber.length > 1) {
        msisdn = '233' + phoneNumber.slice(1);
    }
    
    // Replace the first digit with '233'
    return msisdn;
}