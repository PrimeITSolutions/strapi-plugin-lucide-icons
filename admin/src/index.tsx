import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import pluginId from "./pluginId";
import getTrad from "./utils/getTrad";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "icon",
      pluginId,
      icon: PluginIcon,
      type: "string",
      intlLabel: {
        id: getTrad("lucide-icons.label"),
        defaultMessage: "lucide-icon",
      },
      intlDescription: {
        id: getTrad("lucide-icons.description"),
        defaultMessage: "Select a lucide-icon",
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "react-icons-input-component" */ "./components/LucideIconsSelector"
          ),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: getTrad("lucide-icons.options.advanced.requiredField"),
                  defaultMessage: "Required field",
                },
                description: {
                  id: getTrad(
                    "lucide-icons.options.advanced.requiredField.description"
                  ),
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
