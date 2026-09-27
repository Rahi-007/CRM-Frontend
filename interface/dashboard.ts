export interface IDashboardRes {
    totalUsers: number;
    userGrowthPercentage: number;

    totalProjects: number;
    projectsThisMonth: number;

    totalCompletedProjects: number;
    completionRateThisMonth: number;

    totalClients: number;
    clientsThisMonth: number;
}