import {
  Button,
  FieldAction,
  Flex,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  SearchForm,
  Searchbar,
  TextInput,
  Typography,
} from "@strapi/design-system";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { useState } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import { IconComponent } from "./IconComponent";
import { IconLibraryComponent } from "./IconLibraryComponent";

interface ILucideIconsSelector {
  description: null | MessageDescriptor;
  intlLabel: null | MessageDescriptor;
  placeholder: null | MessageDescriptor;
  name: string;
  error: string;
  required: boolean;
  onChange: any;
  value: ILucideIcon;
}

export type ILucideIcon = keyof typeof dynamicIconImports;

const ReactIconsSelector: React.FC<ILucideIconsSelector> = ({
  description,
  error,
  intlLabel,
  placeholder,
  name,
  required,
  onChange,
  value,
}) => {
  const { formatMessage } = useIntl();
  const allReactIcons = Object.keys(dynamicIconImports) as ILucideIcon[];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const changeIcon = (newIcon: string) =>
    onChange({
      target: {
        name,
        type: "string",
        value: newIcon,
      },
    });

  const onSelectIcon = (newIcon: string) => {
    toggleModal();
    changeIcon(newIcon);
  };

  return (
    <>
      <TextInput
        type="text"
        label={intlLabel && formatMessage(intlLabel)}
        placeholder={placeholder && formatMessage(placeholder)}
        hint={description && formatMessage(description)}
        disabled={true}
        onChange={onChange}
        id={name}
        name={name}
        value={value || ""}
        required={required}
        error={error}
        startAction={
          <FieldAction onClick={toggleModal}>
            {value ? (
              <IconComponent icon={value} />
            ) : (
              <IconComponent icon={"search"} />
            )}
          </FieldAction>
        }
        endAction={
          !!value && (
            <FieldAction onClick={() => changeIcon("")}>
              <IconComponent icon="x" />
            </FieldAction>
          )
        }
      />

      {isModalVisible && (
        <ModalLayout onClose={toggleModal} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" id="title">
              Select icon
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Flex
              direction="column"
              justifyContent="stretch"
              alignItems="stretch"
              gap={5}
            >
              <SearchForm>
                <Searchbar
                  onClear={() => setSearchTerm("")}
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder={formatMessage({
                    id: getTrad("lucide-icons.iconSelector.search"),
                  })}
                >
                  {formatMessage({
                    id: getTrad("lucide-icons.iconSelector.search"),
                  })}
                </Searchbar>
              </SearchForm>

              <Flex
                direction={searchTerm.length <= 0 ? "column" : "row"}
                wrap="wrap"
                alignItems="start"
                gap={searchTerm.length <= 0 ? 5 : 0}
              >
                <Flex
                  direction="row"
                  justifyContent="center"
                  wrap="wrap"
                  gap={3}
                >
                  <IconLibraryComponent
                    icons={allReactIcons.filter((icon) =>
                      icon.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    onSelectIcon={onSelectIcon}
                  />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter
            endActions={
              <Button variant="tertiary" onClick={toggleModal}>
                Close
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ReactIconsSelector;
