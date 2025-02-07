import instance from '../axiosInstance';

// INTF-17: 카테고리 생성
export async function createCategory(parentId: number | null, categoryData: {name: string}) {
  try {
    const url = parentId !== null ? `/categories?parentId=${parentId}` : '/categories';

    const data = await instance.post(url, categoryData, {});
    console.log('데이터', data);
    return data;
  } catch (error) {
    console.error('카테고리 생성 실패:', error);
    throw error;
  }
}

// INTF-18: 카테고리 조회
export async function getCategoryList(parentId?: number) {
  try {
    const url = parentId ? `/categories/list?parentId=${parentId}` : '/categories/list';
    const response = await instance.get<{message: string; data: Category[]}>(url, {});
    const {data} = response;
    return data.data;
  } catch (error) {
    console.error('카테고리 조회 실패:', error);
    throw error;
  }
}

// INTF-19: 카테고리 수정
export async function updateCategory(categoryId: number, categoryData: UpdateCategoryData) {
  try {
    const {data} = await instance.patch(`/categories/${categoryId}`, categoryData);
    return data;
  } catch (error) {
    console.error('카테고리 수정 실패:', error);
    throw error;
  }
}

// INTF-20: 카테고리 삭제
export async function deleteCategory(categoryId: number) {
  try {
    const {data} = await instance.delete(`/categories/${categoryId}`, {});
    return data;
  } catch (error) {
    console.error('카테고리 삭제 실패:', error);
    throw error;
  }
}
