import { FC } from 'react';
import { Header } from '../common/header/Header';
import { Main } from '../common/main/Main';
import { ProfileAvatar } from './profileAvatar/ProfileAvatar';
import { ProfileForm } from './profileForm/ProfileForm';

export const Profile: FC = () => {
  return <Main>
    <Header isAuth={ true } userName='Иван' />
    <ProfileAvatar />
    <ProfileForm />
  </Main>
}
