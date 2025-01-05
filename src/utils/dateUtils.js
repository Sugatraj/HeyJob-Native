/**
 * Format a date to "DD MMM YYYY" format (e.g., "30 Dec 2024")
 * @param {Date|string} date - Date object or date string
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Get current date in "DD MMM YYYY" format
 * @returns {string} Current date formatted as "DD MMM YYYY"
 */
export const getCurrentDate = () => {
  return formatDate(new Date());
}; 