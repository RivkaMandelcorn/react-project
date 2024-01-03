import React, { useState, useEffect } from 'react';
import { Container, Grid,Typography,CircularProgress } from '@mui/material';
import UsersTable from './components/UsersTable';
import UserPosts from './components/UserPosts';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);


  useEffect(() => {   
    fetchUsers();
    fetchPosts();
  }, []);

  function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }
  
  function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }
  
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };
  const addPost = (newPost)=>{
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts, newPost];
      return newPosts;
    });
  }

  return (
    <Container>
    <Typography variant="h3">
      Welcome To The Posts App
    </Typography>
    <Grid container spacing={10}>
        <Grid item xs={12} md={7}>
          <UsersTable onSelectUser={handleSelectUser} users={users} />
        </Grid>
        <Grid item xs={12} md={4}>
          {selectedUser ? (
            <UserPosts selectedUser={selectedUser} posts={posts} addPost={addPost} />
          ) : (
            <CircularProgress/>
                    )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
