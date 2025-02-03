import {useUserStore} from '../../store/store';

// 로고 아이콘 (Landing)
export function LogoIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="6.32451" cy="1.76926" rx="1.7249" ry="1.76926" fill="white" />
      <path
        d="M1.60571 11.6281C0.7189 10.8842 0.60327 9.56258 1.34744 8.67606L4.42691 5.00753C5.17108 4.12101 6.49325 4.00533 7.38006 4.74916V4.74916C8.26687 5.49299 8.3825 6.81465 7.63833 7.70117L4.55886 11.3697C3.81468 12.2562 2.49252 12.3719 1.60571 11.6281V11.6281Z"
        fill="white"
      />
      <path
        d="M4.6648 4.65932C5.55161 3.91549 6.87378 4.03117 7.61795 4.91769L10.6974 8.58622C11.4416 9.47274 11.326 10.7944 10.4392 11.5382V11.5382C9.55234 12.2821 8.23017 12.1664 7.486 11.2799L4.40653 7.61133C3.66236 6.72481 3.77799 5.40315 4.6648 4.65932V4.65932Z"
        fill="#FFD942"
      />
      <ellipse cx="13.2239" cy="1.77708" rx="1.7249" ry="1.76926" fill="white" />
      <path
        d="M7.95922 11.7687C7.07242 11.0249 6.95679 9.70321 7.70096 8.81669L10.7804 5.14815C11.5246 4.26163 12.8468 4.14596 13.7336 4.88978V4.88978C14.6204 5.63361 14.736 6.95527 13.9918 7.84179L10.9124 11.5103C10.1682 12.3969 8.84603 12.5125 7.95922 11.7687V11.7687Z"
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
        fill={role === 'manager' ? '#2C2C2C' : role === 'user' ? '#F6D47A' : role === 'admin' ? '#16407B' : '#FFFFFF'}
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

// 아래 토글 아이콘 (상단바)
export function DownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
