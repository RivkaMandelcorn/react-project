import React, { useState } from 'react';
import { TextField, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, Typography, CircularProgress } from '@mui/material';


const UsersTable = ({ onSelectUser, users }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  if (!users || users.length === 0) {
    return <CircularProgress />;
  }

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  };


  const sortedUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(filter.toLowerCase()) ||
      user.email?.toLowerCase().includes(filter.toLowerCase())
    );
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'email') {
      return sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    } else if (sortBy === 'username') {
      return sortDirection === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    } else {
      return 0;
    }
  });

  return (
    <>
      <TextField
        label="Filter by Name or Email"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        color="secondary"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortDirection}
                onClick={() => handleSort('name')}
              >
                <Typography variant="h6">Name</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'email'}
                direction={sortDirection}
                onClick={() => handleSort('email')}
              >
                <Typography variant="h6">Email</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Username</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id} onClick={() => onSelectUser(user)}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;
