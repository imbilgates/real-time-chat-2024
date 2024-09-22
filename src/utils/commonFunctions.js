import { format, isToday, isYesterday } from 'date-fns';

export const convertTimestamp = (timestamp) => {
  if (timestamp?.seconds) {
    const date = new Date(timestamp.seconds * 1000); // Convert Firestore Timestamp to JS Date

    if (isToday(date)) {
      return `Today, ${format(date, 'hh:mm a')}`; // Format as "Today, hh:mm AM/PM"
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'hh:mm a')}`; // Format as "Yesterday, hh:mm AM/PM"
    } else {
      return format(date, 'MM/dd/yyyy hh:mm a'); // Format as "MM/dd/yyyy hh:mm AM/PM"
    }
  }
  return timestamp; // Return the original if it's not a Firestore Timestamp
};
