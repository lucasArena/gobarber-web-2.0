import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 144px;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1100px;
  width: 100%;

  display: flex;
  align-items: center;

  img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    opacity: 0.6;
  }

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 10px;

  span {
    color: #f4ede8;
    text-decoration: none;
  }

  strong {
    color: #ff9000;
    text-decoration: none;
  }
`;
