import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { Suspense, lazy } from "react";

interface IIconComponent {
  icon: keyof typeof dynamicIconImports;
  size?: number;
}

const strapiTheme = window.localStorage.STRAPI_THEME;

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

export const IconComponent: React.FC<IIconComponent> = ({ icon, size }) => {
  const DynamicIconComponent = lazy(
    dynamicIconImports[icon as IconProps["name"]]
  );
  if (undefined === DynamicIconComponent) return <></>;

  return (
    <Suspense fallback={fallback}>
      <DynamicIconComponent
        size={size}
        color={strapiTheme === "light" ? "#212134" : "#fff"}
      />
    </Suspense>
  );
};
