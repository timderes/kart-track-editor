import Dexie, { type EntityTable } from "dexie";

import { APP_NAME } from "utils/constants";

const lowerCasedAppName = APP_NAME.toLowerCase();

const database = new Dexie(lowerCasedAppName) as Dexie & {
  // TODO: Add a track type here...
  tracks: EntityTable<{ uuid: string; name: string }>;
};

// & = Unique index
database.version(1).stores({
  tracks: "&uuid",
});

export default database;
