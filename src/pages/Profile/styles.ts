import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  margin: -175px auto 0;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 20px;
      text-align: left;
      margin-bottom: 24px;
    }

    > a {
      color: ${({ theme }) => theme.colors.text};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => shade(0.2, theme.colors.text)};
      }
    }

    input[name='old_password'] {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ff9000;
    bottom: 0;
    right: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }
  }
`;