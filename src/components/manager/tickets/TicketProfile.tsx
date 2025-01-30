import React, {useState} from 'react';
import {EditIcon} from '../../common/Icon';
import Profile from '../../common/Profile';
import Input from '../../common/Input';

export default function TicketProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Yeon',
    email: 'yeonii@gmail.com',
    website: 'https://www.kakaowork.com/',
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-6 w-full bg-gray-18 p-5">
      <Profile name={userInfo.name} size="lg" backgroundColor="manager" />
      <div className="flex flex-col items-start">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="w-[400px] flex flex-col gap-2">
            <Input element="input" size="sm" type="text" name="name" value={userInfo.name} onChange={handleChange} />
            <Input element="input" size="sm" type="email" name="email" value={userInfo.email} onChange={handleChange} />
            <Input element="input" size="sm" type="url" name="kakaowork" value={userInfo.website} onChange={handleChange} />
            <div className="flex justify-center mt-3">
              <button type="submit" className="main-button w-fit">
                완료
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <p>{userInfo.name}</p>
              <button onClick={handleEdit}>
                <EditIcon />
              </button>
            </div>
            <p className="text-body-regular">{userInfo.email}</p>
            <p className="text-body-regular">{userInfo.website}</p>
          </>
        )}
      </div>
    </div>
  );
}
