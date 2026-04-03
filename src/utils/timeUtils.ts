/**
 * Returns a greeting based on the current hour of the day.
 * 
 * 05:00 - 11:59: Good Morning
 * 12:00 - 16:59: Good Afternoon
 * 17:00 - 04:59: Good Evening
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
