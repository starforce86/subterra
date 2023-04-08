import React, { ReactElement } from 'react';
import Select from 'react-select';

type OptionRecord = {
  value: string;
  label: string;
};

type CustomProps = {
  options: OptionRecord[];
  selectedOption: OptionRecord;
  placeholder: string;
  disabled?: boolean;
  onChange: Function;
  isMulti?: boolean;
  error?: boolean;
};

export const Dropdown: React.FC<CustomProps> = ({
  options,
  selectedOption,
  placeholder,
  disabled,
  onChange,
  isMulti = false,
  error = false,
}): ReactElement => {
  return (
    <Select
      value={selectedOption}
      onChange={(item: any) => onChange(item)}
      options={options as any[]}
      isDisabled={disabled}
      placeholder={placeholder}
      isSearchable={true}
      theme={(theme: any) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: error ? '#f87165' : '#2cbdff',
        },
      })}
      styles={{
        control: (baseStyles: any) => ({
          ...baseStyles,
          minHeight: 40,
          borderRadius: 8,
          borderColor: error ? '#f87165' : baseStyles.borderColor,
        }),
      }}
      menuPosition="fixed"
      isMulti={isMulti}
    />
  );
};
