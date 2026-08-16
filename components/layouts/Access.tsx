"use client";

import React from "react";
import { useAppSelector } from "@/hook/reduxHooks";

interface IProps {
    permission: string;
    children: React.ReactNode;
}

const Access = ({ permission, children }: IProps) => {
    const permissions = useAppSelector(state => state.auth.permissions);
    const hasPermission = permissions?.some(item => item.name === permission) ?? false;

    if (!hasPermission) {
        return null;
    }

    return <>{children}</>;
};

export default Access;