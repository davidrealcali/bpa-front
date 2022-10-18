import React, { useState, useEffect } from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input } from "antd";
import { DeleteOutlined , EditOutlined, EyeOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { deleteCultives, updateCultives } from '../../../../api/cultivo';
import Modal from "../../../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import AddCultivoForm from '../AddCultivoForm/AddCultivoForm';
import ViewCultivoForm from "../ViewCultivoForm";
import { getDataByCultive } from '../../../../api/cultivo';
import { decodeRolJWT } from '../../../../utils/formValidation';

import "./ListCultivo.css";
import "./ListCultivos.scss";


export default function ListCultivo( props ) {
  const { cultivos, setReloadCultivos } = props;
  const [ gridData, setGridData ] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ editRowKey, setEditRowKey] = useState("");
  const [ sortedInfo, setSortedInfo ] = useState({});
  const [ form ] = Form.useForm();
  const [ searchText, setSearchText ] = useState("");
  const [ filteredInfo, setFilteredInfo ] = useState({});
  const [ isVisibleModal, setIsVisibleModal ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState("");
  const [ modalContent, setModalContent ] = useState(null);
  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(5);
  let [ filteredData ] = useState();
 
  useEffect(() => {
    loadData();
  }, [cultivos]);
  
  const loadData = async() => {
    setLoading(true);
    setGridData(cultivos);
    setSearchText("");
    setLoading( false );
  }

  const dataCultivoMap = gridData.map( (item) => ({
     ...item
  })); 

 const modifiedCultivoData  = dataCultivoMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
    info: `El nombre por el cual se conoce este cultivo es "${item.nombreComun}"
     y su nombre cientifico es "${item.nombreCientifico}"`
 }));

 const handleDelete = ( value ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    const uid = value.uid;
    deleteCultives( token, uid).then( response => {
        notification["success"]({
            message: response.message
        });
        const dataSource = [ ...modifiedCultivoData];
        const filteredData = dataSource.filter((item) => item.uid !== value.uid);
        setGridData(filteredData);

    }).catch( err => {
        notification["success"]({
            message: err
        });
    });
 }

 const isEditing = ( record ) => {
    return record.key === editRowKey;
 }

 const cancel = () => {
    setEditRowKey("");
 };

 const save = async ( key ) => {
    try{
        const token = getAccessTokenApi();
        const { estado, mensaje} = decodeRolJWT(token);
        if( !estado ) {  return notification["error"]({ message: mensaje});}
        const row = await form.validateFields();
        const newData = [...modifiedCultivoData];
        const index = newData.findIndex((item) => key === item.key );
        if( index > -1 ){
            const item = newData[index];
            newData.splice(index, 1, {...item, ...row});
            updateCultives(token, key, newData[index] ).then( response => {
                notification["success"]({
                    message: response
                });
                setGridData(newData);
                setEditRowKey("");
            }).catch( err =>{
                notification["error"]({
                    message: err
                });
            });      
        }

    } catch( err ){
        console.log(err);
    }
 };

 const edit = ( record ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    form.setFieldsValue({
        nombreComun: "",
        nombreCientifico: "",
        cultivoImg: "",
        cicloImg: "",
        ...record
    });
    setEditRowKey(record.key);
 };
 
 const columns = [
    {
        title: "Nombre Comun",
        dataIndex: "nombreComun",
        align : "center",
        editTable: true,
        sorter: (a,b) => a.nombreComun.length - b.nombreComun.length,
        sortOrder: sortedInfo.columnKey === "nombreComun" && sortedInfo.order
    },
    {
        title: "Nombre Cientifico",
        dataIndex: "nombreCientifico",
        align : "center",
        editTable: true,
        sorter: (a,b) => a.nombreCientifico.length - b.nombreCientifico.length,
        sortOrder: sortedInfo.columnKey === "nombreCientifico" && sortedInfo.order
    },
    {
        title: "Url Cultivo",
        dataIndex: "cultivoImg",
        align : "center",
        editTable: false
    },
    {
        title: "Url Ciclo",
        dataIndex: "cicloImg",
        align : "center",
        editTable: false
    },
    {
        title: "Accion",
        dataindex: "action",
        align : "center",
        render: (_, record ) => {
        const editable = isEditing(record);
        return modifiedCultivoData.length >=1 ? (
           <Space>
                <Popconfirm 
                    title="Esta seguro que quiere eliminar el cultivo?"
                    onConfirm = {() => handleDelete(record)}>
                    <Button type='danger' disabled={editable}>
                        <DeleteOutlined />
                    </Button>        
                </Popconfirm>
                { editable ? (
                    <span>
                        <Space size="middle">
                            <Button onClickCapture={() => save(record.key)} 
                            type="primary" style={{marginRight: 8}}>Guardar</Button>
                            <Popconfirm title="Esta seguro que desea cancelar?" onConfirm={cancel}>
                                <Button>Cancel</Button>
                            </Popconfirm>
                        </Space>
                    </span>
                ): (
                    <Button type='primary' onClickCapture={() => edit(record)} >
                        <EditOutlined />
                    </Button>
                )}
                <Button type="primary" onClickCapture={() => viewMenuForm(record)}>
                     <EyeOutlined />
                </Button>
            </Space>
         ) : null;
       }
    },    
 ];

 const mergedColumns = columns.map( (col) => {
    if(!col.editTable) {
        return col;
    }
    return {
        ...col,
        onCell: ( record ) => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record)
        }),
    };
 });

 const EditableCell = ({editing, dataIndex, title, record, children, ...restProps}) => {
    const input = <Input />;
    return (
        <td { ...restProps}>
            { editing ? (
                <Form.Item name={dataIndex} style={{margin:0}} rules={[{
                        required: true,
                        message: `Por favor ingrese un valor ${title} field`
                }]}>
                    {input}
                </Form.Item>
            ): (children)}
        </td>
    );
 };

 const reset = () => {
    setSortedInfo({});
    setFilteredInfo({});
    setSearchText("");
    loadData();
 };

 const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if( e.target.value === "" ) {
        loadData();
    }
 }

 const globalSearch = () => {
    filteredData = modifiedCultivoData.filter(( value ) => {
        return (
             value.nombreComun.toLowerCase().includes(searchText.toLowerCase()) || 
             value.nombreCientifico.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    setGridData(filteredData);
 };

 const addCultivoModal = () => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo cultivo");
    setModalContent(
        <AddCultivoForm setIsVisibleModal={ setIsVisibleModal } setReloadCultivos={setReloadCultivos}/>
    )
};

const viewMenuForm = cultivo => {
    setIsVisibleModal(true);
    setModalContent(
        <ViewCultivoForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadCultivos={setReloadCultivos }
            cultivo={cultivo}
            //dataProblema={dataProblema}
        />
    )
};

  return (
    <div className='data-table' style={{ marginTop: 10}}>
        <div className="menu-web-list__header">
             <Button type="primary" onClick={ () => addCultivoModal()} >Crear Cultivo
             </Button>
        </div>
        <Space style={{marginBottom: 16}}>
            <Input
               placeholder='Ingrese un texto de busqueda'
               onChange={handleInputChange}
               type="text"
               allowClear
               value={searchText}
            />   
            <Button onClick={globalSearch} type="primary">Buscar</Button>
            <Button onClick={reset}>Resetear</Button>
            <Button style={{backgroundColor: "#c2115e", color: "#fff"}}>
                <CSVLink 
                    data={
                        filteredData && filteredData.length ? filteredData: modifiedCultivoData
                    }>
                        Exportar
                </CSVLink>
            </Button>
        </Space>
        <Form form={form} component={false}>
            <DndProvider backend={HTML5Backend}>
                <Table className='data-table-2'
                    columns={mergedColumns}
                    components= {{
                        body: {
                            cell: EditableCell
                        }
                    }}
                    dataSource={filteredData && filteredData.length ? filteredData: modifiedCultivoData}
                    expandable={{
                        expandedRowRender: ( record )=> (
                            <p style={{ margin: 0}}>{ record.info}</p>
                        ),
                        rowExpandable: ( record ) => record.info !== "Not expandable"
                    }}
                    bordered
                    loading={loading}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        onChange: ( page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize)
                        }
                    }}
                >
                </Table>
            </DndProvider>
        </Form>
        <Modal
                title={modalTitle}
                isVisible = { isVisibleModal }
                setIsVisible = { setIsVisibleModal }
                width="50%"
            >
                {modalContent}
       </Modal>
    </div>
  );
};
