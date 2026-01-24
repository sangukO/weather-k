import districts from "@/shared/assets/data/districts.json";

/** 행정구역 데이터 필터링 */
export const getFilteredDistricts = (keyword: string): string[] => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword) return [];

  const nomalizedKeyword = trimmedKeyword.replace(/\s+/g, " ");

  // 과도한 렌더링 방지 slice 개수 제한
  return districts
    .filter((district) => {
      const normalizedDistrict = district.replace(/-/g, " ");

      return normalizedDistrict.includes(nomalizedKeyword);
    })
    .map((district) => district.replace(/-/g, " "))
    .slice(0, 10);
};
