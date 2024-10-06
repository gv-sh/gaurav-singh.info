module.exports = function(str, length) {
    // Fetch screen width 
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 800; // Fallback to 800 if window is not defined

    // If the screen width is greater than 800, we want to truncate the string to 30 characters
    if (screenWidth > 800) {
        length = 20;
    }

    // If the string is longer than the length, we want to truncate it
    if (str.length > length) {
        return str.substring(0, length) + '...';
    }
    return str;
};