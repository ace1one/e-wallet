export function formatDate(dateString) {
    // format date nicely
    // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  export const maskAmount = (amount, isMasked) => {
    if (isMasked) return 'xxx.xx';
    const num = Number(amount);
    return isNaN(num) ? '0.00' : formatNepaliNumber(num);
  };

  export const formatNepaliNumber = (amount) => {
    if (isNaN(amount)) return '0.00';
  
    const isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount);
  
    const [integer, fraction] = absoluteAmount.toFixed(2).split('.');
    const lastThree = integer.slice(-3);
    const otherDigits = integer.slice(0, -3);
  
    const formatted =
      (otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
        (otherDigits ? ',' : '') +
        lastThree);
  
    return `${isNegative ? '-' : ''}${formatted}.${fraction}`;
  };