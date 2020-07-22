import React, { useCallback, useRef, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const { user, updateUser } = useAuth();

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();

        formData.append('avatar', e.target.files[0]);

        const response = await api.patch('/users/avatar', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      formRef.current?.setErrors([]);
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => val.length,
              then: Yup.string().required('Campo obrigtório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(data.old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Suas informações do perfil foram atualizadas',
        });

        history.push('/');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao tentar atualizar o perfil, tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
          <Input type="text" name="email" icon={FiMail} placeholder="Email" />
          <Input
            containerStyle={{ marginTop: 24 }}
            type="password"
            name="old_password"
            icon={FiLock}
            placeholder="Senha atual"
          />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Nova senha"
          />
          <Input
            type="password"
            name="password_confirmation"
            icon={FiLock}
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
