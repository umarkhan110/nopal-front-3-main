export function showFormattedPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // Remove non-numeric characters

  // If the length of the cleaned number is less than 10, return it as is
  if (cleaned.length < 10) {
    return cleaned;
  }

  // Remove "+1" prefix if present
  const numberWithoutPrefix = cleaned.startsWith("1")
    ? cleaned.slice(1)
    : cleaned;

  // Format as (XXX) XXX-XXXX
  return numberWithoutPrefix.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export function convertPhoneFormat(inputValue) {
  // Remove all non-numeric characters from the input
  const cleaned = inputValue.replace(/\D/g, "");

  // Apply formatting based on the length of the cleaned input
  let formattedNumber = "";
  if (cleaned.length > 0) {
    formattedNumber += `(${cleaned.slice(0, 3)}`;
  }
  if (cleaned.length > 3) {
    formattedNumber += `) ${cleaned.slice(3, 6)}`;
  }
  if (cleaned.length > 6) {
    formattedNumber += `-${cleaned.slice(6, 10)}`;
  }
  return formattedNumber;
}

export function cleanAndFormatPhoneNumber(inputValue) {
  // Remove all non-numeric characters from the input
  const cleaned = inputValue.replace(/\D/g, "");

  // Append "+1" at the beginning
  const formattedNumber = `+1${cleaned}`;

  return formattedNumber;
}
