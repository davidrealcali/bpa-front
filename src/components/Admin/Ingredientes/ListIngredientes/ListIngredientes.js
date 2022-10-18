import React, { useState, useEffect, useRef, useCallback } from 'react';
import {Button,  Popconfirm, Table, notification, Space, Form, Input, confirm } from "antd";
import { DeleteOutlined , EditOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { getAccessTokenApi, getRefreshTokenApi } from '../../../../api/auth';
import Modal from "../../../Modal/Modal";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import AddIngredienteForm from '../AddIngredienteForm/AddIngredienteForm';
import { deleteIngredientes, updateIngredientes } from '../../../../api/ingrediente';
import EditIngredienteForm from '../EditIngredienteForm';
import { decodeRolJWT } from '../../../../utils/formValidation';
import ViewIngredienteForm from '../ViewIngredienteForm/ViewIngredienteForm';

export default function ListIngredientes(props) {
    const { ingredientes, setReloadIngredientes } = props;
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
    const [ pageSize, setPageSize ] = useState(4);
    let [ filteredData ] = useState();

    const token = getRefreshTokenApi();
    const { rol, email } = decodeRolJWT(token);
   
    useEffect(() => {
      loadData();
    }, [ingredientes]);
    
    const loadData = async() => {
      setLoading(true);
      setGridData(ingredientes);
      setSearchText("");
      setLoading( false );
    }

    const dataIngredienteMap = gridData.map( (item) => ({
       ...item
    })); 
  
   const modifiedIngredienteData  = dataIngredienteMap.map(({ ...item }) => ({
      ...item,
      key: item.uid,
      info: `prueba`
   }));

   const handleDelete = ( value ) => {
      const uid = value.uid;
      const token = getAccessTokenApi();
      const { estado, mensaje} = decodeRolJWT(token);
      if( !estado ) {  return notification["error"]({ message: mensaje});}
      
      deleteIngredientes( token, uid).then( response => {
          notification["success"]({
              message: response.message
          });
          const dataSource = [ ...modifiedIngredienteData];
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
          const newData = [...modifiedIngredienteData];
          const index = newData.findIndex((item) => key === item.key );
          const token = getAccessTokenApi();
          if( index > -1 ){
              const item = newData[index];
              newData.splice(index, 1, {...item, ...row});
              updateIngredientes(token, key, newData[index] ).then( response => {
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
          nombre: "",
          agnoMercado: "",
          solubilidad: "",
          presionVapor: "",
          grupoQuimico: "",
          clase: "",
          pesoMolecular: "",
          puntoFusion: "",
          puntoFlamabilidad: "",
          formulaEstructural: "",
          efectoAbejas: "",
          efectoAves: "",
          efectoPeces: "",
          efectoAcuatico: "",
          efectoLombrices: "",
          efectoBacterias: "",
          efectoMicroorganismos: "",
          adsorcionSuelo: "",
          vidaMedia: "",
          dosisLetalOral: "",
          dosisLetalDermal: "",
          modoAccion: "",
          mecanismoAccion: "",
          indiceLixiviacion: "",
          traslocacion: "",
          absorcionSuelo: "",
          tipoInformacion: "",
          ...record
      });
      setEditRowKey(record.key);
   };
  
   const handleChange = ( _, filters, sorter ) => {
      const { order, field } = sorter;
      setFilteredInfo( filters );
      setSortedInfo({ columnKey: field, order});
   }

   const viewIngredienteForm = ( ingrediente ) => {
       setModalTitle(`Ingrediente: ${ ingrediente.nombre } `);
       setIsVisibleModal(true);
       setModalContent(
            <ViewIngredienteForm
                ingrediente={ingrediente}
                setIsVisibleModal={setIsVisibleModal}
            />
       );
   }
   
   const columns = [
      {
          title: "Nombre",
          dataIndex: "nombre",
          align : "center",
          editTable: true,
          sorter: (a,b) => a.nombre.length - b.nombre.length,
          sortOrder: sortedInfo.columnKey === "nombre" && sortedInfo.order
      },
      {
          title: "Año mercado",
          dataIndex: "agnoMercado",
          align : "center",
          editTable: true,
          sorter: (a,b) => a.agnoMercado.length - b.agnoMercado.length,
          sortOrder: sortedInfo.columnKey === "agnoMercado" && sortedInfo.order
      },
      {
          title: "Solubilidad",
          dataIndex: "solubilidad",
          align : "center",
          editTable: false
      },
      {
          title: "Presion vapor",
          dataIndex: "presionVapor",
          align : "center",
          editTable: false
      },
      {
        title: "Grupo quimico",
        dataIndex: "grupoQuimico",
        align : "center",
        editTable: false
    },
      
      {
          title: "Accion",
          dataindex: "action",
          align : "center",
          render: (_, record ) => {
          const editable = isEditing(record);
          return modifiedIngredienteData.length >=1 ? (
             <Space>
                  <Popconfirm 
                      title="Esta seguro que quiere eliminar el Ingrediente activo?"
                      onConfirm = {() => handleDelete(record)}>
                      <Button type='danger' disabled={editable}>
                          <DeleteOutlined />
                      </Button>        
                  </Popconfirm>
                  <Button type='primary' onClickCapture={() => editarForm(record)}>
                          <EditOutlined/>
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
                  <Button type="primary" onClickCapture={() => viewIngredienteForm(record)}>
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
      filteredData = modifiedIngredienteData.filter(( value ) => {
          return (
               value.nombre.toLowerCase().includes(searchText.toLowerCase()) || 
               value.agnoMercado.toLowerCase().includes(searchText.toLowerCase())
          );
      });
      setGridData(filteredData);
   };
  
   const addIngredienteModal = () => {
      const token = getAccessTokenApi();
      const { estado, mensaje} = decodeRolJWT(token);
      if( !estado ) {  return notification["error"]({ message: mensaje});}
      setIsVisibleModal(true);
      setModalTitle("Creando nuevo ingrediente activo");
      setModalContent(
          <AddIngredienteForm setIsVisibleModal={ setIsVisibleModal } setReloadIngredientes={setReloadIngredientes}/>
      )
  };

  const editarForm = ( ingrediente ) => {
    const token = getAccessTokenApi();
    const { estado, mensaje} = decodeRolJWT(token);
    if( !estado ) {  return notification["error"]({ message: mensaje});}
    setIsVisibleModal(true);
    setModalTitle(`Editar ingrediente activo: ${ingrediente.nombre}`);
    setModalContent(
        <EditIngredienteForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadIngredientes={setReloadIngredientes}
            ingrediente={ingrediente}
        />
    )
  }

  
    return (
      <div className='data-table' style={{ marginTop: 30}}>
          <div className="menu-web-list__header">
               <Button type="primary" onClick={ () => addIngredienteModal()} >Crear Ingrediente activo
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
                          filteredData && filteredData.length ? filteredData: modifiedIngredienteData
                      }>
                          Exportar
                  </CSVLink>
              </Button>
          </Space>
          <Form form={form} component={false}>
              <DndProvider backend={HTML5Backend}>
                  <Table className='data-table-2'
                      columns={mergedColumns}
                      dataSource={filteredData && filteredData.length ? filteredData: modifiedIngredienteData}
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
