import React, { useState, useEffect, useRef, useCallback } from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input, confirm } from "antd";
import { DeleteOutlined , EditOutlined, SearchOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import "./ListProblema.scss";
import Modal from "../../../Modal/Modal";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import { CSVLink } from "react-csv";
import { deleteProblemas, updateProblemas } from '../../../../api/problema';
import AddProblemaForm from "../../Problemas/AddProblemaForm/AddProblemaForm";

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
  const type = "DraggableBodyRow";

  useEffect(() => {
    loadData();
  }, [problemas]);
  
  const loadData = async() => {
    setLoading(true);
    setGridData(problemas);
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

  const dataProblemaMap = gridData.map( (item) => ({
     ...item
  })); 

 const modifiedProblemaData  = dataProblemaMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
    info: `prueba`
 }));

 const moveRow = useCallback((dragIndex, hoverIndex) => {
    const dragRow = modifiedProblemaData[dragIndex];
    setGridData(update(
        modifiedProblemaData, {
            $splice : [
                [dragIndex, 1 ],
                [hoverIndex, 0, dragRow ]
            ]
        }
    ));
  }, 
     [modifiedProblemaData]
  );

 const handleDelete = ( value ) => {
    const uid = value.uid;
    const token = getAccessTokenApi();
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
        title: "Sintomas",
        dataIndex: "sintomas",
        align : "center",
        editTable: true
    },
    {
        title: "Ciclo vida",
        dataIndex: "cicloVida",
        align : "center",
        editTable: true
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
                            cell: EditableCell,
                            row: DraggableBodyRow
                        }
                    }}
                    onRow={(record, index) => ({
                        index,
                        moveRow
                    })}
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
