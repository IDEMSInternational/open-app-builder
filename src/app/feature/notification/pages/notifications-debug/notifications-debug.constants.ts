/** Delays offered when sending test notifications from debug pages */
export const NOTIFICATION_DEBUG_DELAYS = [
  // quick check with the app open
  { label: "10 s", seconds: 10 },
  // time to close the app first, to test a tap that opens it
  { label: "1 min", seconds: 60 },
  // outlasts the campaign notification service's 3-minute sync
  { label: "5 min", seconds: 300 },
];

/** Default delay for test notifications, in seconds */
export const NOTIFICATION_DEBUG_DEFAULT_DELAY = 60;
