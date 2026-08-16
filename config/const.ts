//W---------={ Const are declared here }=----------</br>
export const BASE_URL = process.env.Backend_API_URL || "http://localhost:5111";

export const PERMISSIONS = {
    USERS_VIEW: "users.view",
    USERS_CREATE: "users.create",
    USERS_EDIT: "users.edit",
    USERS_DELETE: "users.delete",

    TEAMS_VIEW: "teams.view",
    TEAMS_CREATE: "teams.create",
    TEAMS_EDIT: "teams.edit",
    TEAMS_DELETE: "teams.delete",

    PROJECTS_VIEW: "projects.view",
    PROJECTS_CREATE: "projects.create",
    PROJECTS_EDIT: "projects.edit",
    PROJECTS_DELETE: "projects.delete",
    PROJECTS_ASSIGN: "projects.assign",

    CLIENTS_VIEW: "clients.view",
    CLIENTS_CREATE: "clients.create",
    CLIENTS_EDIT: "clients.edit",
    CLIENTS_DELETE: "clients.delete",

    ROLES_VIEW: "roles.view",
    ROLES_CREATE: "roles.create",
    ROLES_EDIT: "roles.edit",
    ROLES_DELETE: "roles.delete",

    SYSTEM_SETTINGS: "system.settings",
} as const;