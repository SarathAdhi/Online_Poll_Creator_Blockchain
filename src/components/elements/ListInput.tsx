import clsx from "clsx";
import Select from "react-select";

export type ListInputOption = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  label?: string;
  value: any | ListInputOption | ListInputOption[];
  required?: boolean;
  isMulti?: boolean;
  className?: string;
  onChange?: (data: ListInputOption) => void;
  options: ListInputOption[];
};

const ListInput: React.FC<Props> = ({
  name,
  className,
  label,
  options,
  isMulti = false,
  value,
  onChange,
  required = false,
}) => {
  const handleSelectionChange = (data: ListInputOption) => {
    onChange?.(data);
  };

  return (
    <div className={clsx("w-full grid gap-1", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-left text-base font-medium text-gray-200 tracking-wide"
        >
          {label} {required && "*"}
        </label>
      )}

      <Select
        id={name}
        name={name}
        instanceId={name}
        menuPosition="fixed"
        className="block text-black placeholder-gray-400 rounded-md appearance-none focus:outline-none text-base"
        styles={{
          control: (base) => ({
            ...base,
            border: "0",
            boxShadow: "0",
            "&:hover": {
              border: "0",
            },
          }),
        }}
        value={value}
        placeholder={`Select a ${name}`}
        onChange={handleSelectionChange}
        options={options}
        isSearchable={true}
        isMulti={isMulti}
      />
    </div>
  );
};

export default ListInput;
