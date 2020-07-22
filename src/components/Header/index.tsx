import React from 'react';
import { FiPower } from 'react-icons/fi';

import { Container, HeaderContent, Profile, ProfileInfo } from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <img src={logo} alt="Logo GoBarber" />
        <Profile to="/profile">
          <>
            <img src={user.avatar_url} alt={user.name} />
            <ProfileInfo>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </ProfileInfo>
          </>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
