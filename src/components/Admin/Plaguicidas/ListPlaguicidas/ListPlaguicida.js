import React, { useState, useEffect, useRef, useCallback } from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input, confirm } from "antd";
import { DeleteOutlined , EditOutlined, SearchOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import Modal from "../../../Modal/Modal";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import { CSVLink } from "react-csv";
import { deletePlaguicidas, updatePlaguicidas } from '../../../../api/plaguicida';
import "./ListPlaguicida.scss";
import AddPlaguicida from '../AddPlaguicidaForm/AddPlaguicida';

export default function ListPlaguicida( props ) {
  const { plaguicidas, setReloadPlaguicidas } = props;
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
  const [ pageSize, setPageSize ] = useState(2);
  let [ filteredData ] = useState();

  const type = "DraggableBodyRow";

  useEffect(() => {
    loadData();
  }, [plaguicidas]);

  const loadData = async() => {
    setLoading(true);
    setGridData(plaguicidas);
    setSearchText("");
    setLoading( false );
  }

  const DraggableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }) => {
     const ref = useRef();
     const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: ( monitor ) => {
            const { index: dragIndex } = monitor.getItem() || {};
            if( dragIndex === index ){
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName : dragIndex < index ? "drop-down-downward" : "drop-over-upward"
            }
        },
        drop : (item) => {
            moveRow(item.index, index)
        },
     });
     const [, drag] = useDrag({
        type,
        item: { index},
        collect: (monitor) => ({
            isDragging : monitor.isDragging()
        })
    });
     drop(drag(ref));
     return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ""}`}
            style={{ cursor: "move", ...style}}
            {...restProps}
        />
     )
  };

  const dataPlaguicidaMap = gridData.map( (item) => ({
    ...item
 })); 

 const modifiedPlaguicidaData  = dataPlaguicidaMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
    info: `Prueba bro`
 }));

 const moveRow = useCallback((dragIndex, hoverIndex) => {
    const dragRow = modifiedPlaguicidaData[dragIndex];
    setGridData(update(
        modifiedPlaguicidaData, {
            $splice : [
                [dragIndex, 1 ],
                [hoverIndex, 0, dragRow ]
            ]
        }
    ));
  }, 
     [modifiedPlaguicidaData]
  );

 const handleDelete = ( value ) => {
    const uid = value.uid;
    const token = getAccessTokenApi();
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
 const columns = [
    {
        title: "Nombre",
        dataIndex: "nombre",
        align : "center",
        editTable: true,
        sorter: (a,b) => a.nombe.length - b.nombre.length,
        sortOrder: sortedInfo.columnKey === "nombre" && sortedInfo.order
    },
    {
        title: "Registro Ica",
        dataIndex: "registroIca",
        align : "center",
        editTable: true,
        sorter: (a,b) => a.registroIca.length - b.registroIca.length,
        sortOrder: sortedInfo.columnKey === "registroIca" && sortedInfo.order
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
        title: "Recomendaciones",
        dataIndex: "recomendaciones",
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
        title: "Descripcion",
        dataIndex: "descripcion",
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
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo plaguicida");
    setModalContent(
        <AddPlaguicida  setIsVisibleModal={ setIsVisibleModal} setReloadPlaguicidas={ setReloadPlaguicidas}/>
    )
};
  
  return (
    <div className='data-table-plaguicida' style={{ marginTop: 10}}>
        <div className="menu-web-list__header">
             <Button type="primary" onClick={ () => addPlaguicidaModal()} >Crear Plaguicida
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
                            cell: EditableCell,
                            row: DraggableBodyRow
                        }
                    }}
                    onRow={(record, index) => ({
                        index,
                        moveRow
                    })}
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
