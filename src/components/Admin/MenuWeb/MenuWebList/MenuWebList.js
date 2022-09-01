import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { updateMenuApi, activeMenuApi, deleteMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import EditMenuWebForm from "../EditMenuWebForm/EditMenuWebForm";
import AddMenuWebForm from "../AddMenuWebForm/AddMenuWebForm"
import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList( props ) {
    const { menu, setReloadMenuWeb } = props;
    const [ isVisibleModal, setIsVisibleModal ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState("");
    const [ modalContent, setModalContent ] = useState(null);
    const [ listItems, setListItems ] = useState([]);

    useEffect(() => {
      const ListItemsArray = [];
      menu.forEach(item => {
            ListItemsArray.push({
                content: (<MenuItem item={item}
                          activateMenu={activateMenu}
                          editMenuWebModal={editMenuWebModal}
                          showDeleteConfirm={showDeleteConfirm}
                          />)
            });
      });
      setListItems(ListItemsArray);
    }, [menu]);
    
    const onSort = ( sortedList, dropEvent ) => {
        const accessToken = getAccessTokenApi();
        sortedList.forEach( item => {
            const { uid } = item.content.props.item;
            const order = item.rank;
            updateMenuApi( accessToken, uid, { order });
        });
    };

    const activateMenu = ( menu, status ) => {
        const accessToken = getAccessTokenApi();
        activeMenuApi( accessToken, menu.uid, status ).then( response => {
            notification["success"]({
                message: response
            });
        });
    }

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menu");
        setModalContent(
            <AddMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        );
    };

    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle('Editando Menu: '+ menu.title );
        setModalContent(
            <EditMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
                menu={menu}
            />
        )
    }

    const showDeleteConfirm =  menu  => {
        const accessToken = getAccessTokenApi();
        confirm({
            title: "Eliminando  menu",
            content: `Estas seguro que quieres eliminar a ${menu.title}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteMenuApi( accessToken, menu.uid ).then( response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadMenuWeb(true);
                }).catch( err => {
                    notification["error"]({
                        message: "No fue posible eliminar el menu"
                    });
                });
            }
        });
    };

    return (
      <div className="menu-web-list">
          <div className="menu-web-list__header">
             <Button type="primary" onClickCapture={addMenuWebModal}>Crear Menu</Button>
          </div>
          <div className="menu-web-list__items">
            <DragSortableList items={listItems} onSort={onSort} type="vertical" />
          </div>
          <Modal
              title={modalTitle}
              isVisible={isVisibleModal}
              setIsVisible={setIsVisibleModal}
          >
             { modalContent }
          </Modal>
      </div>  
    );
}

function MenuItem( props ){
    const { item, activateMenu, editMenuWebModal, showDeleteConfirm } = props;
    return (
        <List.Item
            actions={[
                <Switch 
                    defaultChecked={item.active} 
                    onChange={ e => activateMenu( item, e )}
                />,
                <Button type="primary" onClickCapture={() => editMenuWebModal(item) }>
                    <EditOutlined />
                </Button>,
                <Button type="danger" onClickCapture={ () => showDeleteConfirm( item ) }>
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    )
}