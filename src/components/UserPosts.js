import React, { useState } from 'react';
import { Fab,Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogTitle, CircularProgress, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



const UserPosts = ({ selectedUser, posts, addPost }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    if (!posts || posts.length === 0) {
        return <CircularProgress />;
    }

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setPostTitle('');
        setPostBody('');
    };

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handlePostBodyChange = (event) => {
        setPostBody(event.target.value);
    };

    const createPost = () => {
        const newPost = {
            userId: selectedUser.id,
            id: posts.length + 1,
            title: postTitle,
            body: postBody,
        };

        addPost(newPost);
        closeDialog();
    };


    return (
        <div>
            {posts.length === 0 ? (
                <p>No posts found for the selected user</p>
            ) : (<>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
      <Fab color="secondary" aria-label="add" onClick={openDialog}>
        <AddIcon />
      </Fab>
      <h2 style={{ marginLeft: '10px' }}>{selectedUser.name}'s Posts</h2>
    </div>
                {posts.filter(post => post.userId === selectedUser.id).map(post => (
                    <Accordion key={post.id}>
                        <AccordionSummary><b>{post.title}</b></AccordionSummary>
                        <AccordionDetails>{post.body}</AccordionDetails>
                    </Accordion>
                ))}
            </>
            )}

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogContent>
                    <div style={{ margin: '10px' }}>
                        <TextField
                            label="Post Title"
                            value={postTitle}
                            onChange={handlePostTitleChange}
                            fullWidth
                            color="secondary"
                        />
                    </div>
                    <div style={{ margin: '10px' }}>
                        <TextField
                            label="Post Body"
                            value={postBody}
                            onChange={handlePostBodyChange}
                            multiline
                            rows={4}
                            fullWidth
                            color="secondary"
                        /></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={createPost} color="secondary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)

}
export default UserPosts;