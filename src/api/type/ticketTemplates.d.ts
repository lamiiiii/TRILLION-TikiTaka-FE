declare interface CreateTemplateParams {
  templateTitle: string;
  title: string;
  description: string;
  typeId: number;
  firstCategoryId: number;
  secondCategoryId: number;
  requesterId: number;
  managerId?: number;
}

declare interface TemplateDetail {
  templateTitle: string;
  title: string;
  description: string;
  typeId: number;
  firstCategoryId: number;
  secondCategoryId: number;
  requesterId: number;
  managerId?: number;
  createdAt: string;
  updatedAt: string;
}

declare interface TemplateListItem {
  templateTitle: string;
  title: string;
  typeId: number;
  firstCategoryId: number;
  secondCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

declare interface UpdateTemplateParams extends CreateTemplateParams {
  updatedAt?: string;
}
