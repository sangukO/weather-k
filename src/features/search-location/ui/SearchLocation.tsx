import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Input, Dropdown, useDebounce } from "@/shared";
import { getFilteredDistricts } from "@/entities/district";

interface SearchLocationProps {
  initialValue?: string; // 외부 초기값
}

export const SearchLocation = ({ initialValue = "" }: SearchLocationProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  // 현재 검색 중인지 여부
  const [isSearching, setIsSearching] = useState(false);

  // 0.3초 디바운스 적용
  const debouncedKeyword = useDebounce(keyword, 300);

  // 초기값 변경 시 반영
  useEffect(() => {
    if (initialValue) {
      setKeyword(initialValue);
    }
  }, [initialValue]);

  // 디바운스 이후 드롭다운 목록 변경 로직
  useEffect(() => {
    if (debouncedKeyword) {
      const filtered = getFilteredDistricts(debouncedKeyword);

      if (filtered.length === 1 && filtered[0] === debouncedKeyword) {
        setResults([]);
      } else {
        setResults(filtered);
      }
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [debouncedKeyword]);

  // 입력 시 검색어 상태 업데이트
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  // 드롭다운 선택
  const handleSelect = (item: string) => {
    setKeyword(item);
    setResults([]);
    setIsSearching(false);
  };

  // 키워드가 있고 검색 및 디바운싱이 끝난 상태
  const isStable = keyword && !isSearching && keyword === debouncedKeyword;

  // 결과 0개 및 실제 DB에도 없음
  const showNoDataMessage =
    isStable &&
    results.length === 0 &&
    !getFilteredDistricts(keyword).includes(keyword);

  return (
    <div className="relative w-full max-w-md">
      <Input
        value={keyword}
        onChange={handleSearch}
        placeholder="지역명을 입력하세요."
      />
      {keyword && results.length > 0 && (
        <Dropdown items={results} onSelect={handleSelect} />
      )}

      {showNoDataMessage && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white p-4 text-center text-sm text-gray-500 shadow-xl">
          해당 장소의 정보가 제공되지 않습니다.
        </div>
      )}
    </div>
  );
};
