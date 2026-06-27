// backend/util/financialMath.js

const toCents = (amount) => Math.round(Number(amount) * 100);
const fromCents = (cents) => Number((cents / 100).toFixed(2));

const formatUserCount = (count) => {
  if (count >= 10000000) return (count / 10000000).toFixed(1) + " Cr+";
  if (count >= 100000)   return (count / 100000).toFixed(1) + " L";
  if (count >= 1000)     return (count / 1000).toFixed(1) + "K";
  return count.toString();
};

module.exports = { toCents, fromCents, formatUserCount };