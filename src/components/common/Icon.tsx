// import {IconProps} from '../interfaces/interfaces';

import {useUserStore} from '../../store/store';

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
      <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
