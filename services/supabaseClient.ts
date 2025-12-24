import { createClient } from '@supabase/supabase-js';

// 환경 변수 안전하게 가져오기
// import.meta.env가 undefined일 경우를 대비하여 빈 객체로 초기화
const env = (import.meta as any).env || {};
const ENV_URL = env.VITE_SUPABASE_URL;
const ENV_KEY = env.VITE_SUPABASE_ANON_KEY;

// URL 유효성 검사 헬퍼
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 유효한 URL이 없으면 앱이 꺼지는 것을 막기 위해 더미 URL 사용
const SUPABASE_URL = isValidUrl(ENV_URL) ? ENV_URL : 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = ENV_KEY || 'placeholder-key';

if (!isValidUrl(ENV_URL)) {
  console.warn('Supabase URL이 설정되지 않았습니다. .env 파일에 VITE_SUPABASE_URL을 설정해주세요.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const isClientConfigured = isValidUrl(ENV_URL);