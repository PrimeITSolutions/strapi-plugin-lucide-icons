/**
 *
 * PluginIcon
 *
 */
import { Blocks } from "lucide-react";
import React from 'react';

const strapiTheme = window.localStorage.STRAPI_THEME;

const PluginIcon = () => (
  <Blocks size={32} color={strapiTheme === "light" ? "#212134" : "#fff"} />
);

export default PluginIcon;
