export interface RegisterSubscription{
    AccountId: number;
    PlanId: number;
    UnitPrice: number;
    Frequency: string;
    startDate: Date;
    endDate: Date;
}