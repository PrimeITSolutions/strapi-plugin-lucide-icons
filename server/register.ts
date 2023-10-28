import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "icon",
    plugin: "lucide-icons",
    type: "string",
  });
};
