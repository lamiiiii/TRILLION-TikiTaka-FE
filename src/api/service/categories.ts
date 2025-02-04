import instance from '../axiosInstance';

// 카테고리 생성 (INTF-17)
interface CreateCategoryData {
  name: string;
}

export async function createCategory(token: string, parentId: number, categoryData: CreateCategoryData) {
  try {
    const {data} = await instance.post(`/categories?parentId=${parentId}`, categoryData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('카테고리 생성 실패:', error);
    throw error;
  }
}

// 카테고리 조회 (INTF-18)
interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

export async function getCategoryList(token: string, parentId?: number) {
  try {
    const url = parentId ? `/categories/list?parentId=${parentId}` : '/categories/list';
    const {data} = await instance.get<{message: string; data: Category[]}>(url, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('카테고리 조회 실패:', error);
    throw error;
  }
}

// 카테고리 수정 (INTF-19)
interface UpdateCategoryData {
  name: string;
}

export async function updateCategory(token: string, categoryId: number, categoryData: UpdateCategoryData) {
  try {
    const {data} = await instance.patch(`/categories/${categoryId}`, categoryData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('카테고리 수정 실패:', error);
    throw error;
  }
}

// 카테고리 삭제 (INTF-20)
export async function deleteCategory(token: string, categoryId: number) {
  try {
    const {data} = await instance.delete(`/categories/${categoryId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('카테고리 삭제 실패:', error);
    throw error;
  }
}
