// extractTime.js
export function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;

    return `${hour}:${minutes} ${period}`;
}

// Function to get the date string (Today, Yesterday, or DD-MM-YYYY)
export function getDateString(date) {
    const now = new Date();

    const isToday = isSameDay(date, now);
    const isYesterday = isSameDay(date, new Date(now.getTime() - 86400000)); // 86400000ms = 1 day

    if (isToday) {
        return "Today";
    } else if (isYesterday) {
        return "Yesterday";
    } else {
        // Format as 'DD-MM-YYYY'
        const day = padZero(date.getDate());
        const month = padZero(date.getMonth() + 1); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
    return number.toString().padStart(2, "0");
}

// Helper function to check if two dates are on the same day
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}
