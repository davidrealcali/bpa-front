import React from 'react';
import { List, Button, Modal, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";

import "./PostsLists.scss";

const { confirm } = Modal;

export default function PostsLists(props) {
  const { posts, setReloadPosts, editPost } = props;

  const deletePost = post => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando post",
      content: `¿Estas seguro de eliminar el post ${post.title} ?`,
      onText: "Eliminar",
      okType: "danger",
      onOk() {
        deletePostApi(accessToken, post.uid).then( response => {
          const typeNotification = response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
              message: response.message
          });
          setReloadPosts(true);
        })
        .catch( () => {
            notification["error"]({
              message: "Error del servidor"
            });
        });
      }
    });
  };

  return (
    <div className='posts-list'>
        <List 
           dataSource={posts.docs}
           renderItem={post => (
             <Post post={post} deletePost={deletePost} editPost={editPost} />
         )}
        />
    </div>
  );
}

function Post( props ) {
  const { post, deletePost, editPost } = props;

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type='primary'>
            <EyeOutlined />
          </Button>
        </Link>,
        <Button type='primary' onClick={ () => editPost(post)}>
            <EditOutlined />
        </Button>,
        <Button type='danger'  onClick={ () => deletePost(post)}>
            <DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta title={post.title}/>
    </List.Item>
  );
}
