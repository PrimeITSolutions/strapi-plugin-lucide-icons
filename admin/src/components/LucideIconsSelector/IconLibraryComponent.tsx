import { Box, Typography } from "@strapi/design-system";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import getTrad from "../../utils/getTrad";
import { IconComponent } from "./IconComponent";

export interface IIconLibraryComponent {
  icons: (keyof typeof dynamicIconImports)[];
  onSelectIcon: (newIcon: string) => void;
}
const strapiTheme = window.localStorage.STRAPI_THEME;

const Button = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${strapiTheme === "light" ? "#ccc" : "#464669"};
  border-radius: 4px;
  &:hover {
    border: 1px solid ${strapiTheme === "light" ? "#212134" : "#fff"};
    background-color: ${strapiTheme === "light" ? "#fff" : "#212134"};
  }
`;

export const IconLibraryComponent: React.FC<IIconLibraryComponent> = ({
  icons,
  onSelectIcon,
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      {icons.length > 0 ? (
        icons.map((icon) => (
          <Box
            key={icon}
            variant="secondary"
            onClick={() => {
              onSelectIcon(icon);
            }}
          >
            <Button type="button">
              <IconComponent size={24} icon={icon} />
            </Button>
          </Box>
        ))
      ) : (
        <Typography>
          {formatMessage({
            id: getTrad("lucide-icons.iconSelector.noIconsAvailable"),
          })}
        </Typography>
      )}
    </>
  );
};
