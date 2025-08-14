import pkg from "../../package.json";

export const APP_NAME = pkg.productName;
export const APP_VERSION = pkg.version;

// Date options used on all pages and components
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

/*
 * Maximum number of notifications displayed at a time, other new notifications
 * will be added to queue.
 */
export const NOTIFICATION_LIMIT = 3;
