import React, {useEffect, useState} from 'react';
import DropDown from '../Dropdown';
import {useQuery} from '@tanstack/react-query';
import {getManagerList} from '../../../api/service/users';

interface Manager {
  userId: number;
  username: string;
  email: string;
  role: string;
  profileImageUrl?: string;
}

interface ManagerSelectorProps {
  selectedManagerName: string;
  onManagerSelect: (managerId: number) => void;
}

const ManagerSelector: React.FC<ManagerSelectorProps> = ({selectedManagerName, onManagerSelect}) => {
  const [selectedManager, setSelectedManager] = useState<Manager | undefined>(undefined);

  // 유저 정보 (담당자 리스트) 조회
  const {data: managers} = useQuery({
    queryKey: ['managers'],
    queryFn: getManagerList,
    select: (data) => data.users,
  });

  useEffect(() => {
    if (managers && selectedManagerName) {
      const foundManager = managers.find((manager) => manager.username === selectedManagerName);
      setSelectedManager(foundManager);
    }
  }, [managers, selectedManagerName]);

  const handleSelect = (selectedOption: string) => {
    const selectedUser = managers?.find((user: any) => user.username === selectedOption);
    if (selectedUser) {
      onManagerSelect(selectedUser.userId);
      setSelectedManager(selectedUser);
    }
  };

  return (
    <div>
      <DropDown
        label="담당자"
        value={selectedManager?.username || ''}
        options={managers?.map((user: any) => user.username) || []}
        onSelect={handleSelect}
        border={false}
        paddingX="px-0"
      />
    </div>
  );
};

export default ManagerSelector;
