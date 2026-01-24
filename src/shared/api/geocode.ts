const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

export const getAddressFromCoords = async (
  lat: number,
  lng: number
): Promise<string | null> => {
  try {
    // 좌표 보내서 행정구역 주소 받기
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("주소 변환 실패");
    }

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      // 법정동 사용
      const document =
        data.documents.find((doc: any) => doc.region_type === "B") ||
        data.documents[0];

      // 주소 문자열 가져옴
      const addressName = document.address_name;

      return addressName;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
