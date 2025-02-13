import instance from '../axiosInstance';

// INTF-17: 카테고리 생성
export async function createCategory(parentId: number | null, categoryData: { name: string }) {
  try {
    const url = parentId !== null ? `/categories?parentId=${parentId}` : '/categories';
    const response = await instance.post(url, categoryData, {});
    return response.data;
  } catch (error: any) {
    console.error('카테고리 생성 실패:', error);
    
    // 백엔드에서 전달한 에러 메시지가 있으면 반환
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    
    // 기본 메시지 반환
    throw new Error('카테고리 생성 중 오류가 발생했습니다.');
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
