"use client";

import { useEffect } from "react";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import { useSelectUsersQuery } from "@/service/user.service";
import GSelect from "../generic/GSelect";

type UserFormProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    setSelectedUserName?: React.Dispatch<React.SetStateAction<string>>;
};

function UserSelect<T extends FieldValues>({
    control,
    name,
    label = "User",
    placeholder = "Select User",
    disabled,
    required,
    setSelectedUserName
}: UserFormProps<T>) {
    const { data: users = [], isFetching } = useSelectUsersQuery();

    const options = users.map((user) => ({
        label: `${user.name} ~ ${user.phone}`,
        value: user.id,
    }));

    const selectedUserId = useWatch({
        control,
        name,
    });

    useEffect(() => {
        const selectedUser = users.find(
            (user) => user.id === selectedUserId
        );

        setSelectedUserName?.(selectedUser?.name ?? "");
    }, [selectedUserId, users, setSelectedUserName]);

    return (
        <GSelect.Form
            control={control}
            name={name}
            label={label}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
            required={required}
            isLoading={isFetching}
        />
    );
}

const User = {
    Form: UserSelect,
};

export default User;