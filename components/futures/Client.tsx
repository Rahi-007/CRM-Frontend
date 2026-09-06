"use client";

import { useEffect } from "react";
import { useSelectClientsQuery } from "@/service/client.service";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import GSelect from "../generic/GSelect";

type ClientFormProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    setSelectedClientName?: React.Dispatch<React.SetStateAction<string>>;
};

function ClientSelect<T extends FieldValues>({
    control,
    name,
    label = "Client",
    placeholder = "Select Client",
    disabled,
    required,
    setSelectedClientName
}: ClientFormProps<T>) {
    const { data: clients = [], isLoading } = useSelectClientsQuery();

    const options = clients.map((team) => ({
        label: `${team.name} ~ ${team.phone}`,
        value: team.id,
    }));

    const selectedClientId = useWatch({
        control,
        name,
    });

    useEffect(() => {
        const selectedClient = clients.find(
            (client) => client.id === selectedClientId
        );

        setSelectedClientName?.(selectedClient?.name ?? "");
    }, [selectedClientId, clients, setSelectedClientName]);

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

const Client = {
    Form: ClientSelect,
};

export default Client;