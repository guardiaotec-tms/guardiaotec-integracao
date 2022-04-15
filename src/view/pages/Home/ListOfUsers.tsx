import { Box, Card, CardContent } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { User } from '../../../domain/entities/User';
import { UserRepositoryDatabase } from '../../../infra/repository/UserRepositoryDatabase';

type Props = {};

export const ListOfUsers: FunctionComponent<Props> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRepo = new UserRepositoryDatabase();
      const users = await usersRepo.getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        <Card
          sx={{
            width: 600,
            backgroundColor: '#eeeeff',
          }}
        >
          <CardContent>
            <Box
              sx={{
                border: '1px solid #ccccff',
                borderRadius: '5px',
                boxSizing: 'border-box',
                width: '100%',
                padding: 1,
              }}
            >
              {users.map((u) => {
                return (
                  <p>
                    <b>Usuário:</b> {u.values.email} | <b>Tipo de acesso:</b>{' '}
                    {u.values.accessType}
                  </p>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
