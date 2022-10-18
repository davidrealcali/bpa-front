import React, { useState, useEffect} from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input} from "antd";
import { DeleteOutlined , EditOutlined, EyeOutlined} from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import Modal from "../../../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import { deleteProblemas, updateProblemas } from '../../../../api/problema';
import AddProblemaForm from "../../Problemas/AddProblemaForm/AddProblemaForm";
import EditProblemaForm from '../EditProblemaForm';
import { decodeRolJWT } from '../../../../utils/formValidation';
import ViewProblemaForm from '../ViewProblemaForm/ViewProblemaForm';

import "./ListProblema.scss";

export default function ListProblema( props) {
  const { problemas, setReloadProblemas } = props;
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
  let [ filteredData ] = useState();
  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(4);

  useEffect(() => {
    loadData();
  }, [problemas]);
  
  const loadData = async() => {
    setLoading(true);
    setGridData(problemas);
    setSearchText("");
    setLoading( false );
  }

  const dataProblemaMap = gridData.map( (item) => ({
     ...item
  })); 

 const modifiedProblemaData  = dataProblemaMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
    info: `prueba`
 }));

 const handleDelete = ( value ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    const uid = value.uid;
    deleteProblemas( token, uid).then( response => {
        notification["success"]({
            message: response.message
        });
        const dataSource = [ ...modifiedProblemaData];
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
        const row = await form.validateFields();
        const newData = [...modifiedProblemaData];
        const index = newData.findIndex((item) => key === item.key );
        const token = getAccessTokenApi();
        if( index > -1 ){
            const item = newData[index];
            newData.splice(index, 1, {...item, ...row});
            updateProblemas(token, key, newData[index] ).then( response => {
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
        comentarios: "",
        categoriaProblema: "",
        sintomas: "",
        cicloVida: "",
        ...record
    });
    setEditRowKey(record.key);
 };

 const handleChange = ( _, filters, sorter ) => {
    const { order, field } = sorter;
    setFilteredInfo( filters );
    setSortedInfo({ columnKey: field, order});
 }

 const editarForm = ( problema ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle(`Editar problema: ${problema.nombreComun}`);
    setModalContent(
        <EditProblemaForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadProblemas={setReloadProblemas}
            problema={problema}
        />
    );
 }

 const viewProblemaForm = ( problema ) => {
    setModalTitle(`Problema: ${problema.nombreComun}`);
    setIsVisibleModal(true);
    setModalContent(
        <ViewProblemaForm
            problema={problema}
            setIsVisibleModal={setIsVisibleModal}
        />
    );
 }
 
 const columns = [
    {
        title: "Nombre Comun",
        dataIndex: "nombreComun",
        align : "center",
        editTable: true
    },
    {
        title: "Nombre Cientifico",
        dataIndex: "nombreCientifico",
        align : "center",
        editTable: true
    },
    {
        title: "Comentarios",
        dataIndex: "comentarios",
        align : "center",
        editTable: false
    },
    {
        title: "Categoria Problema",
        dataIndex: "categoriaProblema",
        align : "center",
        editTable: false
    },
    {
        title: "Accion",
        dataindex: "action",
        align : "center",
        render: (_, record ) => {
        const editable = isEditing(record);
        return modifiedProblemaData.length >=1 ? (
           <Space>
                <Popconfirm 
                    title="Esta seguro que quiere eliminar el problema?"
                    onConfirm = {() => handleDelete(record)}>
                    <Button type='danger' disabled={editable}>
                        <DeleteOutlined />
                    </Button>        
                </Popconfirm>
                <Button type='primary' onClickCapture={ () => editarForm(record)} >
                        <EditOutlined />
                </Button> 
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
                    <Button type='edit' onClickCapture={() => edit(record)} >
                        <EditOutlined />
                    </Button>
                )}
                <Button type="primary" onClickCapture={() => viewProblemaForm(record)}>
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
    filteredData = modifiedProblemaData.filter(( value ) => {
        return (
             value.nombreComun.toLowerCase().includes(searchText.toLowerCase()) || 
             value.nombreCientifico.toLowerCase().includes(searchText.toLowerCase()) ||
             value.comentarios.toLowerCase().includes(searchText.toLowerCase()) ||
             value.categoriaProblema.toLowerCase().includes(searchText.toLowerCase()) ||
             value.sintomas.toLowerCase().includes(searchText.toLowerCase()) || 
             value.cicloVida.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    setGridData(filteredData);
 };

 const addCultivoModal = () => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo problema");
    setModalContent(
        <AddProblemaForm setIsVisibleModal={ setIsVisibleModal } setReloadProblemas={setReloadProblemas}/>
    )
};

  return (
    <div className='data-table' style={{ marginTop: 10}}>
        <div className="menu-web-list__header">
             <Button type="primary" onClick={ () => addCultivoModal()} >Crear Problema
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
                        filteredData && filteredData.length ? filteredData: modifiedProblemaData
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
                    dataSource={filteredData && filteredData.length ? filteredData: modifiedProblemaData}
                    expandable={{
                        expandedRowRender: ( record )=> (
                            <p style={{ margin: 0}}>{ record.info}</p>
                        ),
                        rowExpandable: ( record ) => record.info !== "Not expandable"
                    }}
                    bordered
                    loading={loading}
                    onChange={handleChange}
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
            >
                {modalContent}
       </Modal>
    </div>
  );
};
