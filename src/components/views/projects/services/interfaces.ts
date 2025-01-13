// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MediaDto {}

export enum ProjectStatusType {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  HALTED = "HALTED",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED",
}

export enum ProjectCategoryType {
  FOOD = "FOOD",
  HEALTH = "HEALTH",
  EDUCATION = "EDUCATION",
  ENVIRONMENT = "ENVIRONMENT",
  RELIGION = "RELIGION",
  HUMANITARIAN = "HUMANITARIAN",
  HOUSING = "HOUSING",
  OTHER = "OTHER",
}

export interface Project {
  id: string;
  title: string;
  description: string;
  goal: number;
  startTime: string;
  endTime: string;
  statusType: ProjectStatusType;
  categoryType: ProjectCategoryType;
  countryIsoCode: string;
  charityId: string;
  mediaDtoList: MediaDto[];
}
