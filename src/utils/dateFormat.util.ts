export function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  const day = date.getDate();

  // Add ordinal suffix (st, nd, rd, th)
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return `${formattedDate.split(' ')[0]} ${dayWithSuffix} ${formattedDate.split(' ')[1]}`;
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th'; // catch all 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}