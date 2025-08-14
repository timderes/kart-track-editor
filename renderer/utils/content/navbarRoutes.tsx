import { IconHome, IconSettings } from "@tabler/icons-react";

/**
 * `navbarRoutes` defines the routes for the application's navigation bar.
 *
 * Note: The `label` values are keys used for looking up translated strings in
 * the app's localization files.
 */
const navbarRoutes = [
  // TODO: Reactivate the disabled routes once their corresponding pages are implemented and functional.
  {
    icon: <IconHome />,
    label: "routes.home",
    route: "/",
  },
  {
    icon: <IconSettings />,
    label: "routes.settings",
    route: "/settings",
  },
];

export default navbarRoutes;
