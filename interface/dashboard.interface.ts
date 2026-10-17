export interface IDashboardRes {
    totalUsers: number;
    userGrowthPercentage: number;

    totalProjects: number;
    projectsThisMonth: number;

    totalCompletedProjects: number;
    completionRateThisMonth: number;

    totalClients: number;
    clientsThisMonth: number;

    projectOverview: {
        status: number;
        count: number;
    }[];

    recentProjects: {
        id: number;
        name: string;
        clientName: string;
        designerName: string;
        status: number;
        createdAt: string;
    }[];

    topPerformerTrends: {
        designerId: string;
        designerName: string;
        month: string;
        totalQuantity: number;
    }[];
}