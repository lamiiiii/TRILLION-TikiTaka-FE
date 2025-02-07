import {useUserStore} from '../../store/store';

// 로고 아이콘 (Landing)
export function LogoIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8.24702" cy="2.30682" rx="2.24898" ry="2.30682" fill="white" />
      <path
        d="M2.09357 15.1623C0.937324 14.1925 0.786561 12.4692 1.75683 11.3134L5.77194 6.5302C6.74222 5.37433 8.4661 5.22351 9.62235 6.19334V6.19334C10.7786 7.16317 10.9294 8.88639 9.95908 10.0423L5.94397 14.8254C4.9737 15.9813 3.24982 16.1321 2.09357 15.1623V15.1623Z"
        fill="white"
      />
      <path
        d="M6.08416 6.07634C7.24041 5.10651 8.9643 5.25733 9.93457 6.41321L13.9497 11.1964C14.92 12.3522 14.7692 14.0754 13.6129 15.0453V15.0453C12.4567 16.0151 10.7328 15.8643 9.76254 14.7084L5.74742 9.92526C4.77715 8.76939 4.92792 7.04617 6.08416 6.07634V6.07634Z"
        fill="#FFD942"
      />
      <ellipse cx="17.2412" cy="2.32245" rx="2.24898" ry="2.30682" fill="white" />
      <path
        d="M10.3787 15.3498C9.22248 14.38 9.07172 12.6567 10.042 11.5009L14.0571 6.7177C15.0274 5.56183 16.7513 5.41101 17.9075 6.38084V6.38084C19.0638 7.35067 19.2145 9.07389 18.2442 10.2298L14.2291 15.0129C13.2589 16.1688 11.535 16.3196 10.3787 15.3498V15.3498Z"
        fill="white"
      />
    </svg>
  );
}

// 알림 아이콘 (상단바)
export function PushIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4417 17.5013C11.2952 17.7539 11.0849 17.9635 10.8319 18.1092C10.5788 18.255 10.292 18.3317 10 18.3317C9.70802 18.3317 9.42116 18.255 9.16814 18.1092C8.91513 17.9635 8.70484 17.7539 8.55833 17.5013M15 6.66797C15 5.34189 14.4732 4.07012 13.5355 3.13243C12.5979 2.19475 11.3261 1.66797 10 1.66797C8.67392 1.66797 7.40215 2.19475 6.46447 3.13243C5.52678 4.07012 5 5.34189 5 6.66797C5 12.5013 2.5 14.168 2.5 14.168H17.5C17.5 14.168 15 12.5013 15 6.66797Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 작은 프로필 아이콘 (상단바)
export function SmProfileIcon() {
  const role = useUserStore((state) => state.role);
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 13C1 6.37258 6.37258 1 13 1V1C19.6274 1 25 6.37258 25 13V13C25 19.6274 19.6274 25 13 25V25C6.37258 25 1 19.6274 1 13V13Z"
        fill={role === 'MANAGER' ? '#2C2C2C' : role === 'USER' ? '#F6D47A' : role === 'ADMIN' ? '#16407B' : '#FFFFFF'}
      />
      <path
        d="M0.5 13C0.5 19.9036 6.09644 25.5 13 25.5C19.9036 25.5 25.5 19.9036 25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13Z"
        stroke="#F5F5F5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 아래 토글 아이콘 - white (상단바)
export function DownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 아래 토글 아이콘 - gray
export function SmDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="#727586" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 우측 방향 아이콘 Lg (사이드바)
export function LgRightIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 15L12.5 10L7.5 5" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 우측 방향 아이콘 Sm (사이드바)
export function SmRightIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12.1523L10 8.15234L6 4.15234" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 좌측 방향 아이콘 xs (사이드바)
export function XsLeftIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.125 3.25L4.875 6.5L8.125 9.75" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 대시보드 아이콘 (사이드바)
export function DbIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 통계 아이콘 (사이드바)
export function StatIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8333 2.65234H4.16667C3.24619 2.65234 2.5 3.39854 2.5 4.31901V15.9857C2.5 16.9062 3.24619 17.6523 4.16667 17.6523H15.8333C16.7538 17.6523 17.5 16.9062 17.5 15.9857V4.31901C17.5 3.39854 16.7538 2.65234 15.8333 2.65234Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 5.98568H5.83333V13.4857H8.33333V5.98568Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 5.98568H11.6667V10.1523H14.1667V5.98568Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 티켓 아이콘 (사이드바)
export function TicketIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.3337 9.9987H13.3337L11.667 12.4987H8.33366L6.66699 9.9987H1.66699M18.3337 9.9987V14.9987C18.3337 15.4407 18.1581 15.8646 17.8455 16.1772C17.5329 16.4898 17.109 16.6654 16.667 16.6654H3.33366C2.89163 16.6654 2.46771 16.4898 2.15515 16.1772C1.84259 15.8646 1.66699 15.4407 1.66699 14.9987V9.9987M18.3337 9.9987L15.4587 4.25703C15.3207 3.97935 15.108 3.74567 14.8445 3.58226C14.5809 3.41885 14.2771 3.3322 13.967 3.33203H6.03366C5.72359 3.3322 5.41971 3.41885 5.1562 3.58226C4.89268 3.74567 4.67997 3.97935 4.54199 4.25703L1.66699 9.9987"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 티켓 생성 아이콘 (사이드바)
export function NewTicketIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 7.24382V13.9105M6.66667 10.5771H13.3333M4.16667 3.07715H15.8333C16.7538 3.07715 17.5 3.82334 17.5 4.74382V16.4105C17.5 17.331 16.7538 18.0771 15.8333 18.0771H4.16667C3.24619 18.0771 2.5 17.331 2.5 16.4105V4.74382C2.5 3.82334 3.24619 3.07715 4.16667 3.07715Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 마이페이지 아이콘 (사이드바)
export function MyIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.6663 17.5V15.8333C16.6663 14.9493 16.3152 14.1014 15.69 13.4763C15.0649 12.8512 14.2171 12.5 13.333 12.5H6.66634C5.78229 12.5 4.93444 12.8512 4.30932 13.4763C3.6842 14.1014 3.33301 14.9493 3.33301 15.8333V17.5M13.333 5.83333C13.333 7.67428 11.8406 9.16667 9.99967 9.16667C8.15873 9.16667 6.66634 7.67428 6.66634 5.83333C6.66634 3.99238 8.15873 2.5 9.99967 2.5C11.8406 2.5 13.333 3.99238 13.333 5.83333Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 계정 관리 아이콘 (사이드바)
export function AccountIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_855_3350)">
        <path
          d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H4.16666C3.28261 12.5 2.43476 12.8512 1.80964 13.4763C1.18452 14.1014 0.833328 14.9493 0.833328 15.8333V17.5M19.1667 17.5V15.8333C19.1661 15.0948 18.9203 14.3773 18.4678 13.7936C18.0153 13.2099 17.3818 12.793 16.6667 12.6083M13.3333 2.60833C14.0503 2.79192 14.6859 3.20892 15.1397 3.79359C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57764 15.5935 7.29673 15.1397 7.88141C14.6859 8.46608 14.0503 8.88308 13.3333 9.06667M10.8333 5.83333C10.8333 7.67428 9.34094 9.16667 7.49999 9.16667C5.65905 9.16667 4.16666 7.67428 4.16666 5.83333C4.16666 3.99238 5.65905 2.5 7.49999 2.5C9.34094 2.5 10.8333 3.99238 10.8333 5.83333Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_855_3350">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// 카테고리 관리 아이콘 (사이드바)
export function CategoryIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_86_3046)">
        <path
          d="M17.5 6.66667V17.5H2.49998V6.66667M8.33331 10H11.6666M0.833313 2.5H19.1666V6.66667H0.833313V2.5Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_86_3046">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// 문의/요청 관리 아이콘 (사이드바)
export function InquiryIcon({strokeColor}: {strokeColor: string}) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_89_3944)">
        <path
          d="M7.57502 7.50033C7.77094 6.94338 8.15765 6.47375 8.66665 6.1746C9.17565 5.87546 9.7741 5.76611 10.356 5.86592C10.9379 5.96573 11.4657 6.26826 11.8459 6.71993C12.2261 7.1716 12.4342 7.74326 12.4334 8.33366C12.4334 10.0003 9.93335 10.8337 9.93335 10.8337M10 14.167H10.0084M18.3334 10.0003C18.3334 14.6027 14.6024 18.3337 10 18.3337C5.39765 18.3337 1.66669 14.6027 1.66669 10.0003C1.66669 5.39795 5.39765 1.66699 10 1.66699C14.6024 1.66699 18.3334 5.39795 18.3334 10.0003Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_89_3944">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// 로그아웃 아이콘 (사이드바)
export function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
        stroke="#565965"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 바로가기 아이콘 (상단 메뉴)
export function LinkIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.99935 13.8346L13.3327 10.5013M13.3327 10.5013L9.99935 7.16797M13.3327 10.5013H6.66602M18.3327 10.5013C18.3327 15.1037 14.6017 18.8346 9.99935 18.8346C5.39698 18.8346 1.66602 15.1037 1.66602 10.5013C1.66602 5.89893 5.39698 2.16797 9.99935 2.16797C14.6017 2.16797 18.3327 5.89893 18.3327 10.5013Z"
        stroke="#222222" // 블랙
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 체크 박스 속 체크
export function WhiteCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#F5F5F5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AlertIcon({className = ''}: {className?: string}) {
  return (
    <svg
      className={`w-4 h-4 ${className}`} // ✅ className을 받아서 적용
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 22h20L12 2z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
// 체크 아이콘
export function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 닫기 아이콘
export function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L1 9M1 1L9 9" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

//점 3개 메뉴 아이콘
export function DotIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10.0007 10.8327C10.4609 10.8327 10.834 10.4596 10.834 9.99935C10.834 9.53911 10.4609 9.16602 10.0007 9.16602C9.54041 9.16602 9.16732 9.53911 9.16732 9.99935C9.16732 10.4596 9.54041 10.8327 10.0007 10.8327Z"
        stroke="#354052"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.834 10.8327C16.2942 10.8327 16.6673 10.4596 16.6673 9.99935C16.6673 9.53911 16.2942 9.16602 15.834 9.16602C15.3737 9.16602 15.0007 9.53911 15.0007 9.99935C15.0007 10.4596 15.3737 10.8327 15.834 10.8327Z"
        stroke="#354052"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16732 10.8327C4.62756 10.8327 5.00065 10.4596 5.00065 9.99935C5.00065 9.53911 4.62756 9.16602 4.16732 9.16602C3.70708 9.16602 3.33398 9.53911 3.33398 9.99935C3.33398 10.4596 3.70708 10.8327 4.16732 10.8327Z"
        stroke="#354052"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 템플릿 닫기 아이콘
export function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8333 14.1663L15 9.99967L10.8333 5.83301M5 14.1663L9.16667 9.99967L5 5.83301"
        stroke="#43454F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
//세로 점 3개 아이콘
export function VerticalDotIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7.99992 8.66602C8.36811 8.66602 8.66659 8.36754 8.66659 7.99935C8.66659 7.63116 8.36811 7.33268 7.99992 7.33268C7.63173 7.33268 7.33325 7.63116 7.33325 7.99935C7.33325 8.36754 7.63173 8.66602 7.99992 8.66602Z"
        stroke="#1E1E1E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99992 3.99935C8.36811 3.99935 8.66659 3.70087 8.66659 3.33268C8.66659 2.96449 8.36811 2.66602 7.99992 2.66602C7.63173 2.66602 7.33325 2.96449 7.33325 3.33268C7.33325 3.70087 7.63173 3.99935 7.99992 3.99935Z"
        stroke="#1E1E1E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99992 13.3327C8.36811 13.3327 8.66659 13.0342 8.66659 12.666C8.66659 12.2978 8.36811 11.9993 7.99992 11.9993C7.63173 11.9993 7.33325 12.2978 7.33325 12.666C7.33325 13.0342 7.63173 13.3327 7.99992 13.3327Z"
        stroke="#1E1E1E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 닫기 아이콘
export function EditIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 14.2707H14M11 3.27066C11.2652 3.00544 11.6249 2.85645 12 2.85645C12.1857 2.85645 12.3696 2.89303 12.5412 2.9641C12.7128 3.03517 12.8687 3.13934 13 3.27066C13.1313 3.40198 13.2355 3.55788 13.3066 3.72946C13.3776 3.90104 13.4142 4.08494 13.4142 4.27066C13.4142 4.45638 13.3776 4.64027 13.3066 4.81185C13.2355 4.98344 13.1313 5.13934 13 5.27066L4.66667 13.604L2 14.2707L2.66667 11.604L11 3.27066Z"
        stroke="#727586"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RightArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10.8333 14.1673L15 10.0007L10.8333 5.83398M5 14.1673L9.16667 10.0007L5 5.83398"
        stroke="#43454F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 캘린더 아이콘
export function CalendarIcon() {
  return (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.1667 1.33301V3.99967M4.83333 1.33301V3.99967M1.5 6.66634H13.5M2.83333 2.66634H12.1667C12.903 2.66634 13.5 3.26329 13.5 3.99967V13.333C13.5 14.0694 12.903 14.6663 12.1667 14.6663H2.83333C2.09695 14.6663 1.5 14.0694 1.5 13.333V3.99967C1.5 3.26329 2.09695 2.66634 2.83333 2.66634Z"
        stroke="#D0D4E7"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 추가 아이콘
export function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.99984 4.16602V15.8327M4.1665 9.99935H15.8332"
        stroke="#43454F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 목록 아이콘
export function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.1667 8.33333H2.5M17.5 5H2.5M17.5 11.6667H2.5M14.1667 15H2.5"
        stroke="#1E1E1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusCircle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clip-path="url(#clip0_238_4096)">
        <path
          d="M10.0001 6.66602V13.3327M6.66675 9.99935H13.3334M18.3334 9.99935C18.3334 14.6017 14.6025 18.3327 10.0001 18.3327C5.39771 18.3327 1.66675 14.6017 1.66675 9.99935C1.66675 5.39698 5.39771 1.66602 10.0001 1.66602C14.6025 1.66602 18.3334 5.39698 18.3334 9.99935Z"
          stroke="#1E1E1E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_238_4096">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// 중요도 (별표) 아이콘
interface StarIconProps {
  color?: string;
}
export function StarIcon({color = '#727586'}: StarIconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.49998 1.33301L9.55998 5.50634L14.1666 6.17967L10.8333 9.42634L11.62 14.013L7.49998 11.8463L3.37998 14.013L4.16665 9.42634L0.833313 6.17967L5.43998 5.50634L7.49998 1.33301Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReferredIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99992 5.83398V8.50065M7.99992 11.1673H8.00659M14.6666 8.50065C14.6666 12.1825 11.6818 15.1673 7.99992 15.1673C4.31802 15.1673 1.33325 12.1825 1.33325 8.50065C1.33325 4.81875 4.31802 1.83398 7.99992 1.83398C11.6818 1.83398 14.6666 4.81875 14.6666 8.50065Z"
        stroke="#1E1E1E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RequiredIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 4.33333H4.8L6.36667 5.9L5.9 6.36667L4.33333 4.8V7H3.66667V4.76667L2.1 6.33333L1.63333 5.86667L3.13333 4.33333H1V3.66667H3.2L1.63333 2.1L2.1 1.63333L3.66667 3.2V1H4.33333V3.13333L5.86667 1.6L6.33333 2.1L4.76667 3.66667H7V4.33333Z"
        fill="#2a54de"
      />
    </svg>
  );
}
