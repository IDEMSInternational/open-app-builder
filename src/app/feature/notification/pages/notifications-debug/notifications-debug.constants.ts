import { TEST_CAMPAIGN_ID } from "src/app/shared/services/notification/local-notification.service";

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

/** Delay before a test copy of a listed notification arrives, in seconds */
export const TEST_COPY_DELAY_SECONDS = 60;

/**
 * Start of the id of every notification action test notification, so tests can be told apart from
 * authored notifications, e.g. in the `_notifications` data list synced to the server.
 * Matches the campaign id of campaign tests
 */
export const TEST_ID_PREFIX = TEST_CAMPAIGN_ID;
/** Prefix of notification action test notification ids, followed by the due time */
export const TEST_NOTIFICATION_ID_PREFIX = `${TEST_ID_PREFIX}_notification`;
/** Prefix of notification action test copy ids, followed by the original id and the due time */
export const TEST_COPY_ID_PREFIX = `${TEST_ID_PREFIX}_copy`;
