import { format } from 'date-fns'

export  const convertTimestamp = (timestamp) => {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert Firestore Timestamp to JS Date
      return format(date, 'MM/dd/yyyy HH:mm'); // Format as you prefer (optional, using date-fns)
    }
    return timestamp; // Return the original if it's not a Firestore Timestamp
  };
