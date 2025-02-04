declare interface CreateCategoryData {
  name: string;
}

declare interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

declare interface UpdateCategoryData {
  name: string;
}
