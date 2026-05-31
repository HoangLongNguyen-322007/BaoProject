export const formatDate = (date) => {
   if (!(date instanceof Date)) {
      date = new Date(date);
   }

   return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
};

export const formatTime = (date) => {
   if (!(date instanceof Date)) {
      date = new Date(date);
   }

   return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
   });
};

export const getTimeAgo = (date) => {
   if (!(date instanceof Date)) {
      date = new Date(date);
   }

   const now = new Date();
   const seconds = Math.floor((now - date) / 1000);

   if (seconds < 60) return 'Just now';
   if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
   if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
   if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

   return formatDate(date);
};
