"use client";

import { useSelectDesignationsQuery } from "@/service/designation.service";
import { Control, FieldValues, Path } from "react-hook-form";
import GSelect from "../generic/GSelect";

type DesignationFormProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
};

function DesignationSelect<T extends FieldValues>({
    control,
    name,
    label = "Designation",
    placeholder = "Select Designation",
    disabled,
    required,
}: DesignationFormProps<T>) {
    const { data: designations = [], isLoading } = useSelectDesignationsQuery();

    const options = designations.map((designation) => ({
        label: designation.name,
        value: designation.id,
    }));

    return (
        <GSelect.Form
            control={control}
            name={name}
            label={label}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
            required={required}
            isLoading={isLoading}
        />
    );
}

const Designation = {
    Form: DesignationSelect,
};

export default Designation;