import React, { useState, useEffect } from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input } from "antd";
import { DeleteOutlined , EditOutlined, EyeOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import Modal from "../../../Modal/Modal";
import { DndProvider} from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import { deletePlaguicidas, updatePlaguicidas } from '../../../../api/plaguicida';
import AddPlaguicida from '../AddPlaguicidaForm/AddPlaguicida';
import EditPlaguicidaForm from '../EditPlaguicidaForm/EditPlaguicidaForm';
import { decodeRolJWT } from '../../../../utils/formValidation';
import ViewPlaguicidaForm from '../ViewPlaguicidaForm/ViewPlaguicidaForm';
import AddIngredienteActivoForm from '../AddIngredienteActivoForm/AddIngredienteActivoForm';
import "./ListPlaguicida.scss";


export default function ListPlaguicida( props ) {
  const { plaguicidas, setReloadPlaguicidas, ingredientes } = props;
  const [ gridData, setGridData ] = useState([]);
  const [ ingredienteData, setIngredienteData ] = useState([]);
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
  const [ pageSize, setPageSize ] = useState(4);
  let [ filteredData ] = useState();

  useEffect(() => {
    loadData();
  }, [plaguicidas]);

  useEffect(() => {
    loadData2();
  }, [ingredientes]);

  const loadData2 = async() => {
    setLoading(true);
    setIngredienteData(ingredientes);
    setSearchText("");
    setLoading( false );
  }

  const loadData = async() => {
    setLoading(true);
    setGridData(plaguicidas);
    setSearchText("");
    setLoading( false );
  }

  const dataPlaguicidaMap = gridData.map( (item) => ({
    ...item
 })); 

 const modifiedPlaguicidaData  = dataPlaguicidaMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
    info: `Prueba bro`
 }));

 const handleDelete = ( value ) => {
    const uid = value.uid;
    const token = getAccessTokenApi();
    const { estado, mensaje } = decodeRolJWT(token);
    if( !estado ) { return notification["error"]({ message: mensaje }); }
    deletePlaguicidas( token, uid).then( response => {
        console.log(response);
        notification["success"]({
            message: response.message
        });
        const dataSource = [ modifiedPlaguicidaData ];
        const filteredData = dataSource.filter((item) => item.uid !== value.uid);
        console.log(filteredData);
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
        const newData = [...modifiedPlaguicidaData];
        const index = newData.findIndex((item) => key === item.key );
        const token = getAccessTokenApi();
        if( index > -1 ){
            const item = newData[index];
            newData.splice(index, 1, {...item, ...row});
            updatePlaguicidas(token, key, newData[index] ).then( response => {
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
    const { estado, mensaje } = decodeRolJWT(token);
    if( !estado ) {
        return notification["error"]({ message: mensaje });
    }

    form.setFieldsValue({
        nombre: "",
        registroIca: "",
        tipoRegistro: "",
        comercializador: "",
        titularRegistro: "",
        recomendaciones: "",
        clasePlaguicida: "",
        tipoVigencia: "",
        categoriaToxicologica: "",
        observaciones: "",
        formulacion: "",
        descripcion :"",
        ...record
    });
    setEditRowKey(record.key);
 };

 const handleChange = ( _, filters, sorter ) => {
    const { order, field } = sorter;
    setFilteredInfo( filters );
    setSortedInfo({ columnKey: field, order});
 }

 const editarForm = ( plaguicida ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje } = decodeRolJWT(token);
    if( !estado ) {
        return notification["error"]({ message: mensaje});
    }
    setIsVisibleModal(true);
    setModalTitle(`Editar plagucida: ${plaguicida.nombre}`)
    setModalContent(
        <EditPlaguicidaForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadPlaguicidas={setReloadPlaguicidas}
            plaguicida={plaguicida}
        />
    )
 }

 const viewPlaguicidaForm = (plaguicida) => {
    setModalTitle('Plaguicida: '+plaguicida.nombre)
    setIsVisibleModal(true);
    setModalContent(
        <ViewPlaguicidaForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadPlaguicidas={setReloadPlaguicidas}
            plaguicida={plaguicida}
        />
    );
 }

 const columns = [
    {
        title: "Nombre",
        dataIndex: "nombre",
        align : "center",
        editTable: true,
    },
    {
        title: "Registro Ica",
        dataIndex: "registroIca",
        align : "center",
        editTable: true,
    },
    {
        title: "Tipo registro",
        dataIndex: "tipoRegistro",
        align : "center",
        editTable: true
    },
    {
        title: "Comercializador",
        dataIndex: "comercializador",
        align : "center",
        editTable: true
    },
    {
        title: "Clase plaguicida",
        dataIndex: "clasePlaguicida",
        align : "center",
        editTable: false
    },
    {
        title: "Tipo vigencia",
        dataIndex: "tipoVigencia",
        align : "center",
        editTable: false
    },
    {
        title: "Accion",
        dataindex: "action",
        align : "center",
        render: (_, record ) => {
        const editable = isEditing(record);
        return modifiedPlaguicidaData.length >=1 ? (
           <Space>
                <Popconfirm 
                    title="Esta seguro que quiere eliminar el plaguicida?"
                    onConfirm = {() => handleDelete(record)}>
                    <Button type='danger' disabled={editable}>
                        <DeleteOutlined />
                    </Button>        
                </Popconfirm>
                <Button type='primary' onClickCapture={ () => editarForm(record)}>
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
                <Button type="primary" onClickCapture={() => viewPlaguicidaForm(record)}>
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
    filteredData = modifiedPlaguicidaData.filter(( value ) => {
        return (
             value.nombre.toLowerCase().includes(searchText.toLowerCase()) || 
             value.registroIca.toLowerCase().includes(searchText.toLowerCase()) ||
             value.tipoRegistro.toLowerCase().includes(searchText.toLowerCase()) ||
             value.comercializador.toLowerCase().includes(searchText.toLowerCase()) ||
             value.titularRegistro.toLowerCase().includes(searchText.toLowerCase()) ||
             value.recomendaciones.toLowerCase().includes(searchText.toLowerCase()) ||
             value.clasePlaguicida.toLowerCase().includes(searchText.toLowerCase()) ||
             value.tipoVigencia.toLowerCase().includes(searchText.toLowerCase()) ||
             value.categoriaToxicologica.toLowerCase().includes(searchText.toLowerCase()) ||
             value.observaciones.toLowerCase().includes(searchText.toLowerCase()) ||
             value.formulacion.toLowerCase().includes(searchText.toLowerCase()) ||
             value.descripcion.toLowerCase().includes(searchText.toLowerCase())    
        );
    });
    setGridData(filteredData);
 };

const addPlaguicidaModal = () => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo plaguicida");
    setModalContent(
        <AddPlaguicida  setIsVisibleModal={ setIsVisibleModal} setReloadPlaguicidas={ setReloadPlaguicidas}/>
    )
};

const addIngredienteActivo = (e) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle("Adicionar ingrediente activo");
    setModalContent(
        <AddIngredienteActivoForm 
           setIsVisibleModal={setIsVisibleModal}
           plaguicidas={gridData}
           setReloadPlaguicidas={setReloadPlaguicidas}
           ingredientes={ingredienteData}
           setIngredienteData={setIngredienteData}
        />
    )
}
  
  return (
    <div className='data-table' style={{ marginTop: 10}}>
        <div className="menu-web-list__header">
             <Button type="primary" onClick={ () => addPlaguicidaModal()} >Crear Plaguicida
             </Button>
        </div>
        <div className="menu-web-list__header">
             <Button type="danger" onClick={ () => addIngredienteActivo()} >Adicionar Ingrediente Activo
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
                        filteredData && filteredData.length ? filteredData: modifiedPlaguicidaData
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
                    dataSource={filteredData && filteredData.length ? filteredData: modifiedPlaguicidaData}
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
