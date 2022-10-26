import React, { useState, useEffect } from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input } from "antd";
import { DeleteOutlined , EditOutlined, EyeOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { deleteCultives, updateCultives } from '../../../../api/cultivo';
import Modal from "../../../Modal/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
//import AddCultivoForm from '../AddCultivoForm/AddCultivoForm';
import { decodeRolJWT } from '../../../../utils/formValidation';
import { deleteCultiveLmr, updateCultiveLmr } from '../../../../api/lmrCultivo';

export default function ListLmrCultivo( props ) {
  const { lmrCultivo , setReloadLmrCultivos } = props;
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
  }, [lmrCultivo]);
  
  const loadData = async() => {
    setLoading(true);
    setGridData(lmrCultivo);
    setSearchText("");
    setLoading( false );
  }

  const dataLmrMap = gridData.map( (item) => ({
     ...item
  })); 
  
 const modifiedLmrData  = dataLmrMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
    cultivo: item.cultivo._id,
    ingrediente: item.ingrediente._id,
    cultivoNom: item.cultivo.nombreComun,
    ingredienteNom: item.ingrediente.nombre,
    info: ``
 }));
 const prueba = () => {
  console.log(dataLmrMap);
 }
 const handleDelete = ( value ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    const uid = value.uid;
    deleteCultiveLmr( token, uid).then( response => {
        notification["success"]({
            message: response.message
        });
        const dataSource = [ ...modifiedLmrData];
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
        const newData = [...modifiedLmrData];
        const index = newData.findIndex((item) => key === item.key );
        if( index > -1 ){
            const item = newData[index];
            newData.splice(index, 1, {...item, ...row});
            updateCultiveLmr(token, key, newData[index] ).then( response => {
                notification["success"]({
                    message: response
                });
                //setGridData(newData);
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
        cultivoNom:"",
        ingredienteNom: "",
        lmr: "",
        ...record
    });
    setEditRowKey(record.key);
 };
 
 const columns = [
    {
        title: "Ingrediente",
        dataIndex: "ingredienteNom",
        align : "center",
        editTable: false,
       // sorter: (a,b) => a.nombreComun.length - b.nombreComun.length,
        //sortOrder: sortedInfo.columnKey === "nombreComun" && sortedInfo.order
    },
    {
        title: "Cultivo",
        dataIndex: "cultivoNom",
        align : "center",
        editTable: false,
       // sorter: (a,b) => a.nombreCientifico.length - b.nombreCientifico.length,
       // sortOrder: sortedInfo.columnKey === "nombreCientifico" && sortedInfo.order
    },
    {
        title: "Lmr",
        dataIndex: "lmr",
        align : "center",
        editTable: true
    },
    {
        title: "Accion",
        dataindex: "action",
        align : "center",
        render: (_, record ) => {
        const editable = isEditing(record);
        return modifiedLmrData.length >=1 ? (
           <Space>
                <Popconfirm 
                    title="Esta seguro que quiere eliminar el indice lmr?"
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
    filteredData = modifiedLmrData.filter(( value ) => {
        return (
             value.cultivoNom.toLowerCase().includes(searchText.toLowerCase()) || 
             value.ingredienteNom.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    setGridData(filteredData);
 };

 const addCultivoModal = () => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo indice Lmr");
    setModalContent(
        //<AddCultivoForm setIsVisibleModal={ setIsVisibleModal } setReloadLmrCultivos={setReloadLmrCultivos}/>
    )
}

  return (
    <div className='data-table' style={{ marginTop: 10}}>
        <div className="menu-web-list__header">
            {/** <Button type="primary" onClick={ () => addCultivoModal()} >Crear Indice Lmr
             </Button> **/ }
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
                        filteredData && filteredData.length ? filteredData: modifiedLmrData
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
                    dataSource={filteredData && filteredData.length ? filteredData: modifiedLmrData}
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
