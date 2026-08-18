"use client";

import React from "react";
import { useAppSelector } from "@/hook/reduxHooks";

interface IProps {
    permission?: string;
    permissions?: string[];
    children: React.ReactNode;
}

const Access = ({ permission, permissions, children }: IProps) => {
    const userPermissions = useAppSelector(
        state => state.auth.permissions
    );

    const requiredPermissions = [
        ...(permission ? [permission] : []),
        ...(permissions ?? []),
    ];

    const hasPermission =
        requiredPermissions.length > 0 &&
        userPermissions?.some(item =>
            requiredPermissions.includes(item.name)
        );

    if (!hasPermission) {
        return null;
    }

    return <>{children}</>;
};

export default Access;