/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'ADMIN' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'ENGINEER' },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'David White',
      email: 'david@example.com',
      role: 'ENGINEER',
    },
    { id: 5, name: 'Emma Green', email: 'emma@example.com', role: 'ADMIN' },
    { id: 6, name: 'Frank Harris', email: 'frank@example.com', role: 'INTERN' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'ENGINEER' },
    { id: 8, name: 'Henry King', email: 'henry@example.com', role: 'INTERN' },
    {
      id: 9,
      name: 'Isabella Scott',
      email: 'isabella@example.com',
      role: 'ENGINEER',
    },
    { id: 10, name: 'Jack Miller', email: 'jack@example.com', role: 'ADMIN' },
  ];
  findAll(role?: 'INTERN ' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const usersWithRole = this.users.filter((user) => user.role === role);
      if (!usersWithRole.length) throw new NotFoundException('Role Not Found');
      return usersWithRole;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: userByHighestId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
