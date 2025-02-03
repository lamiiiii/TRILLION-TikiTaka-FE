import {Category, Template} from '../interfaces/newTicket';

export const categoriesDummy: Category[] = [
  {
    id: 1,
    name: 'Compute Service',
  },
  {
    id: 4,
    firstId: 1,
    name: 'Virtual Machine',
  },
  {
    id: 5,
    firstId: 1,
    name: 'Bare Metal Server',
  },
  {
    id: 6,
    firstId: 1,
    name: 'GPU',
  },
  {
    id: 2,
    name: 'Networking Service',
  },
  {
    id: 7,
    firstId: 2,
    name: 'VPC',
  },
  {
    id: 8,
    firstId: 2,
    name: 'Load Balancing',
  },
  {
    id: 9,
    firstId: 2,
    name: 'CDN',
  },
  {
    id: 10,
    firstId: 2,
    name: 'DNS',
  },
  {
    id: 11,
    firstId: 2,
    name: 'Transit Gateway',
  },
  {
    id: 3,
    name: 'Container Pack',
  },
];

export const templatesDummy: Template[] = [
  {
    id: 1,
    firstCategory: 'ContainerPack',
    secondCategory: 'Kubernetes Engine',
    name: '템플릿 A',
    type: '생성',
    title: '마이크로서비스 기반의 애플리케이션 컨테이너화',
    createdAt: '2024-02-01',
  },
  {
    id: 2,
    firstCategory: 'ContainerPack',
    secondCategory: 'Kubernetes Engine',
    name: '템플릿 A',
    type: '생성',
    title: '마이크로서비스',
    createdAt: '2024-02-01',
  },
  {
    id: 3,
    firstCategory: 'ContainerPack',
    secondCategory: 'Kubernetes Engine',
    name: '템플릿 A',
    type: '생성',
    title: '마이크로서비스 기반의 애플리케이션 컨테이너화',
    createdAt: '2024-02-01',
  },
  {
    id: 4,
    firstCategory: 'ContainerPack',
    secondCategory: 'Kubernetes Engine',
    name: '템플릿 A',
    type: '생성',
    title: '마이크로서비스 기반의 애플리케이션 컨테이너화',
    createdAt: '2024-02-01',
  },
  {
    id: 5,
    firstCategory: 'ContainerPack',
    secondCategory: 'Kubernetes Engine',
    name: '템플릿 A',
    type: '생성',
    title: '마이크로서비스 기반의 애플리케이션 컨테이너화',
    createdAt: '2024-02-01',
  },
];

export const templateDummy: Template = {
  id: 1,
  name: '템플릿 이름',
  firstCategory: '카테고리 1',
  secondCategory: '카테고리 2',
  manager: '관리자 이름',
  type: '타입 1',
  title: '템플릿 제목',
  content: '여기에 템플릿 내용이 들어갑니다.',
  createdAt: '2025-02-03',
};
