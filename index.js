let str = "Rp19.700";
// Remove the "Rp" prefix and any non-numeric characters
let numStr = str.replace(/[^\d]/g, "");

console.log(numStr); // Output: 19700
