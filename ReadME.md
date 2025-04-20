## 🎟️ TikiTaka
##### Ticket Management System v0.0.2
<br>

## 목차
- [프로젝트 소개](#-프로젝트-소개)
- [개발기간 및 작업 관리](#%EF%B8%8F-개발기간-및-작업-관리)
- [개발 환경](#%EF%B8%8F-개발-환경)
- [프로젝트 주요 기능](#-프로젝트-주요-기능)
- [프로젝트 아키텍쳐](#-프로젝트-아키텍쳐)
- [프로젝트 회고](#-프로젝트-회고)
- [팀원 소개](#-팀원-소개)
- [프론트엔드 역할 분담](#%EF%B8%8F-프론트엔드-역할-분담)
- [FE 성능 테스트 및 개선](#fe-성능-테스트-및-개선)
<br>

## 👨‍🏫 프로젝트 소개
- [프로젝트 개요](https://nova-sheep-66e.notion.site/174c54f24ef58020a5ece8827063e5af)
<br>

## ⏲️ 개발기간 및 작업 관리
#### 개발 기간

- 전체 개발 기간 : 2025-01-20 ~ 2025-02-19
- UI 구현 : 2025-01-20 ~ 2025-02-05
- 기능 구현 : 2025-02-05 ~ 2025-02-07
- QA 및 테스트 : 2025-02-07 ~ 2025-02-19

#### 작업 관리

- GitHub Issues와 Jira를 사용하여 진행 상황을 공유했습니다.
- 데일리스크럼을 통해 작업 순서와 방향성, 컴포넌트 관리, 프로젝트에 대한 고민을 나누었습니다.
- Discord를 통해 Github PR 코드리뷰 및 승인 요청과 머지 완료 여부를 공유했습니다.
<br>

## ⚙️ 개발 환경

### Frontend Stack

![React](https://img.shields.io/badge/React-18-blue?logo=react)  
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?logo=tailwindcss)  
![Zustand](https://img.shields.io/badge/Zustand-5.0.3-yellow?logo=zustand)  
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=tanstackquery)  
![Axios](https://img.shields.io/badge/Axios-1.7.9-5A29E4?logo=axios)  
![npm](https://img.shields.io/badge/npm-10.9.1-CB3837?logo=npm)  
![ESLint](https://img.shields.io/badge/ESLint-8.57.1-4B32C3?logo=eslint)  
![Prettier](https://img.shields.io/badge/Prettier-3.4.2-F7B93E?logo=prettier)  

### Node.js 버전
- Node.js 버전: v20.12.0

### 패키지 매니저
- 사용된 패키지 매니저: npm
<br>

## 환경 변수

프로젝트 실행을 위해 다음 환경 변수를 설정해야 합니다:

1. `.env` 파일을 프로젝트 루트 디렉토리에 생성하고 아래와 같이 설정합니다:

```env
MODE=development
PORT=3000
```
<br>

## 작업 관리 툴

- 버전 및 이슈관리 : Jira, Github Issues
- 협업 툴 : Discord, Notion, Jira
- 서비스 배포 환경 : ~~https://www.tikitaka.kr~~
- 디자인 : [Figma](https://www.figma.com/design/thuLRItFgpXsQCvar1PNcv/TikiTaka?node-id=1-2&t=QVZw96DEQ4ZCN3SA-1)
- [코드 컨벤션](https://nova-sheep-66e.notion.site/c01ae7bcd64f49a7b84e939445885c2d?pvs=4)
- [기술 선정 배경](https://nova-sheep-66e.notion.site/ff35997f14984273b7ada28eb04ca520?pvs=73)
<br>


## ⭐ 프로젝트 주요 기능

- **담당자 티켓 대시보드** : 담당자는 티켓을 상태별, 담당자별, 카테고리별, 유형별로 대시보드에서 조회 가능
![image](https://github.com/user-attachments/assets/309da5da-54e4-4380-aba8-fad40cde61af)
<br/>

- **담당자 티켓 관리** : 담당자는 본인 티켓을 관리 가능
![image](https://github.com/user-attachments/assets/c00d05eb-f094-49dc-bbc7-f8f4af8e1ebf)
<br/>

- **담당자 통계 관리** : 담당자는 일별 / 월별로 티켓 통계 조회 가능
![image](https://github.com/user-attachments/assets/28aefd53-155b-4398-9718-ec7b44dd0773)
<br/>

- **사용자 티켓 대시보드** : 사용자는 본인이 생성한 티켓을 상태별, 담당자별, 카테고리별, 유형별로 대시보드에서 조회 가능
![image](https://github.com/user-attachments/assets/bcb5d399-8276-4fcc-b379-d7e8835e6950)
<br/>

- **티켓 생성** : 사용자는 본인이 작성한 템플릿을 불러와 티켓을 생성 가능
![image](https://github.com/user-attachments/assets/d11b8e02-a41f-4d2c-bb33-0bbfd7ebd77b)
<br/>

- **관리자 계정 관리** : 관리자는 계정 등록 신청을 승인/거절 가능하고 등록된 유저 목록 조회 가능
![image](https://github.com/user-attachments/assets/ea670cca-9f5d-4137-8934-01bf3190e565)
<br/>

- **관리자 카테고리 관리** : 관리자는 카테고리를 생성/수정/삭제 가능하고 카테고리별 요청 양식을 생성/수정/삭제 가능
![image](https://github.com/user-attachments/assets/8eedb150-3776-475e-b362-e44c2f1a75a8)
<br/>

- **관리자 문의/요청 관리** : 관리자는 사용자들의 문의 및 요청 사항에 답변을 등록하고 관리 가능
![image](https://github.com/user-attachments/assets/23e4ccb2-1159-4275-902b-b8371a040a88)
<br/>
<br>

## 🔧 프로젝트 아키텍쳐 
<img width="926" alt="아키텍처" src="https://github.com/user-attachments/assets/f2fbfcc3-fe2c-4340-b45b-2571c5f3e634" />
<br>

## 📝 프로젝트 회고
- [프로젝트 회고록](https://nova-sheep-66e.notion.site/19ec54f24ef580aebdc2e9662d03c436?pvs=4)
- [FE 트러블 슈팅](https://abrupt-zucchini-bad.notion.site/TikiTaka-FE-1b20cf352c9e80c1adfce14ebbad6a87)
<br>

## 👥 팀원 소개

|                                        Backend / PM                                        |                                        Backend / PL                                        |                                   Backend / Infrastructure                                   |                                      Backend                                      |                                      Backend                                      |
|:------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|
| <img src="https://avatars.githubusercontent.com/u/127392025?v=4" width=200px alt="임호준"/> | <img src="https://avatars.githubusercontent.com/u/76063864?v=4" width=200px alt="이동석"/> | <img src="https://avatars.githubusercontent.com/u/162435572?v=4" width=200px alt="장해준"/> | <img src="https://avatars.githubusercontent.com/u/104374987?v=4" width=200px alt="김기훈"/> | <img src="https://avatars.githubusercontent.com/u/144196895?v=4" width=200px alt="강민재"/> |
|           [@Hojun-IM](https://github.com/Hojun-IM)           |           [@DaveLee-b](https://github.com/DaveLee-b)           |           [@HaejunJang](https://github.com/HaejunJang)           |           [@upsc208](https://github.com/upsc208)           |           [@Kangai1](https://github.com/Kangai1)           |
|                                       임호준 (PM)                                        |                                        이동석 (PL)                                         |                                     장해준 (인프라)                                      |                                      김기훈                                      |                                      강민재                                      |

|                                       Frontend / PL                                       |                                   Frontend / 디자인                                    |                                      Frontend                                      |
|:----------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|
| <img src="https://avatars.githubusercontent.com/u/115445005?v=4" width=200px alt="김규리"/> | <img src="https://avatars.githubusercontent.com/u/120254101?v=4" width=200px alt="곽서연"/> | <img src="https://avatars.githubusercontent.com/u/91466601?v=4" width=200px alt="김낙도"/> |
|           [@lamiiiii](https://github.com/lamiiiii)           |           [@yeonilil](https://github.com/yeonilil)           |           [@NAKDO](https://github.com/NAKDO)           |
|                                       김규리 (PL)                                       |                                       곽서연 (디자인)                                        |                                      김낙도                                      |
<br>

## 🛠️ 프론트엔드 역할 분담

### 김규리 (PL)  
- **사이드바 및 탑바 UI 구현**  
  - **고정형 Sidebar**: 메뉴 호버 시 토글 효과 제공, **현재 위치** 표시  
  - **사용자 정보 표시(UserBox)**: 로그인한 사용자의 프로필 정보(아이디, 이메일, 프로필 변경 등) 표시  
  - **탑바**: 로그인한 사용자의 **역할 표시**, 프로필 및 비밀번호 변경, 로그아웃 메뉴 추가  

- **초기 페이지(로그인 & 계정 등록) 및 인증 시스템**  
  - 로그인, 회원가입 페이지 구현 (`react-hook-form` + `yup` 검증 적용)  
  - **JWT 기반 인증 시스템** 구축 (`access token` + `refresh token` 방식)  
  - **로그아웃 기능 포함**, `access token` 만료 시 자동 로그아웃 처리  
  - **Axios 인터셉터(Intercept) 활용**, 토큰 자동 갱신 및 요청 처리  

- **티켓 생성 페이지 & 티켓 수정 페이지**:  
  - 마크다운 뷰어 커스텀 및 폼 입력 기능 구현  
  - 첨부 파일 업로드 및 미리보기 제공
  - 티켓 수정 페이지: 기존 데이터를 불러와 수정 가능하도록 구현
  - DOMPurify 적용

- **티켓 템플릿 관리**:  
  - 생성/수정/삭제/조회 기능 개발  
  - **Split View UI 적용**, 템플릿을 보면서 생성 가능하도록 구현  
  - **커스텀 Split 기능 추가**, 유동적인 사이즈 조절 가능
  - **Optimistic UI 적용**, 템플릿 변경 시 빠른 사용자 경험 제공  

- **인증 및 인가 관리**:  
  - **JWT 기반 인증 시스템** 구축 (`access token` + `refresh token` 방식)  
  - **Axios 인터셉터(Interceptor) 적용**, 토큰 자동 갱신 및 요청 처리  
    - `access token`은 HTTP 요청 헤더에 자동으로 추가  
    - **Refresh token**을 **쿠키**로 확인하여, 만료된 `access token`을 갱신  
    - `refresh token` 만료 시, 자동으로 재로그인 처리  
  - 로그인 시 **비밀번호 변경 필요 여부** 확인, 필요시 비밀번호 변경 페이지로 리디렉션  
  - **Auth Guard** 적용: 
    - **역할 기반 접근 제어**: 각 역할에 맞지 않는 페이지는 접근 불가  
    - **로그인 관리**: 로그인하지 않은 유저는 접근 불가, 이미 로그인한 유저는 로그인 페이지 접근 시 기존 페이지로 리디렉션  

- **기본 개발 환경 구성**:  
  - TailwindCSS 세팅, ESLint & Prettier 설정을 통한 코드 스타일 표준화 
  - 초기 개발 환경 세팅 및 전체 라우팅 시스템 담당

- **DOMPurify 적용**:
  - XSS 방지 기능 모든 폼에 적용  

---

### 곽서연 (디자인 및 UI 개발)  
- **UI/UX 디자인 시스템 구축**:  
  - Figma를 활용한 디자인 시스템 설계  

- **사용자 티켓 대시보드**:  
  - 목록에서 다중 선택 및 일괄 작업 가능하도록 구현  

- **사용자 티켓 상세 조회 페이지**  
  - **서버 상태 동기화** (`useMutation`, `invalidateQueries`) 적용  
  - 담당자 상태 및 설정 변경을 **실시간으로 반영** 

- **담당자 통계 관리 페이지**  
  - **Chart.js 기반 대시보드 구현**, 주요 지표 시각화  
  - **React Suspense 적용**, 로딩 UX 최적화  

---

### 김낙도 (티켓 관리 및 관리자 페이지)  
- **담당자 티켓 목록 페이지**:  
  - 담당자가 편리하게 작업할 수 있도록 **목록에서 상태 변경 기능** 추가  
  - **담당자별, 상태별 필터링 및 정렬 기능 구현**  

- **관리자 페이지 개발**:  
  - **계정 관리**: 계정 생성, 수정, 삭제 기능 구현  
  - **카테고리 관리**: 카테고리 CRUD 기능 개발  

---

### 🔗 공통 기술 스택 및 주요 구현 사항  
- **API 통신**  
  - `axios` 활용하여 공통 API 호출 모듈 제작  

- **상태 관리**  
  - `zustand`를 활용한 **전역 상태 관리**, 불필요한 리렌더링 최소화  
  - `React Query` (`useMutation`, `invalidateQueries`) 활용하여 **실시간 데이터 동기화**  
  - **Optimistic UI** 적용, API 응답을 기다리지 않고 즉시 UI 업데이트  

- **보안 및 성능 최적화**  
  - **XSS 방지**: `DOMPurify`를 활용하여 입력 필드 및 마크다운 렌더링 보호  
  - **Lazy Loading & Code Splitting** 적용, 페이지별 성능 최적화

<br>

## FE 성능 테스트 및 개선

### 1. 코드 분할 → **초기 로딩 최적화**
- **Lazy Loading**: 페이지 컴포넌트를 초기 번들에 포함하지 않고, 사용자가 해당 페이지를 방문할 때만 로드하여 초기 로딩 시간을 최적화.
- **Suspense와 Fallback 컴포넌트 사용**: 컴포넌트가 로드될 때까지 기다리고 로딩 상태를 처리. 이로 인해 사용자가 페이지를 로드할 때 깜빡임이나 빈 화면을 경험하지 않도록 개선.

### 2. 메타 태그 최적화 → **SEO 최적화 성능 개선**
- **메타 제목(title) 및 설명(description)** 최적화: 페이지의 주제와 내용을 정확히 설정하여 검색엔진 크롤러가 더 잘 인식하도록 개선. 이는 검색 결과에서 페이지 노출도를 높이고 클릭률(CTR)을 증가시킵니다.
