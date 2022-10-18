import React, { useState, useEffect } from 'react';
import { Space, Table, Tag , Card, Input, Button, notification } from "antd";
import { FontSizeOutlined, LinkOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import { getDataByCultive, getPlaguicidaByProblema } from '../../../../api/cultivo';
import { getAccessTokenApi } from '../../../../api/auth';
import Modal from "../../../Modal/Modal";
import ViewPlaguicidaForm from '../ViewPlaguicidaForm/ViewPlaguicidaForm';

export default function ViewCultivoForm(props) {
  const { cultivo, setReloadCultivos} = props;
  const [ cultivoData, setCultivoData ] = useState({});
  const [ dataProblema, setDataProblema ] = useState({});
  const [ searchText, setSearchText ] = useState("");
  const [ modalContent, setModalContent ] = useState(null);
  const [ modalTitle,   setModalTitle ] = useState("");
  const [ isVisibleModal, setIsVisibleModal ] = useState(false);
  const [ loading, setLoading] = useState(false);

  const { Meta } = Card;
  const token = getAccessTokenApi();
  /*Seteando dadtos de cultivo */
  useEffect(() => {
    //setLoading(true);
    setCultivoData(cultivo);
    //setLoading(false);
  }, [cultivo]);

  useEffect(() => {
    //setLoading(true);
    getDataByCultive (token , cultivoData.uid ).then( response => {
        if ( response.total > 0 ){
          setDataProblema(response.data);
      //    setLoading(false);
        }  
    });
  }, [cultivoData]);
  
  const tabList = [
    { key: 'tab1', tab: 'Cultivo', },
    Object.keys(dataProblema).length !== 0 ? { key: 'tab2', tab: 'Problemas Asociados', } : '',
  ];

  const InfoCultivo = ( props ) => {
      const { cultivo } = props;
      return (
        <Card
          hoverable
          style={{ margin: "center" }}
          //cover={<img alt="example" style={{ height: 220}}src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
       <Meta title="Nombre Comun" description={ cultivo.nombreComun } />
       <Meta title="Nombre Cientifico" description={ cultivo.nombreCientifico } />
       </Card>
      )
  }
  /*
  const dataProblemaMap = dataProblema.map( (item) => ({
    ...item
   })); 

  const modifiedProblemaData  = dataProblemaMap.map(({ ...item }) => ({
    ...item,
    key: item.uid,
  }));}*/

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if( e.target.value === "" ) {
       setDataProblema(dataProblema);
    }
 }

  /*const globalSearch = () => {
    filteredData = modifiedProblemaData.filter(( value ) => {
      console.log('entro aca',value);
        return (
             value.problema.nombreComun.toLowerCase().includes(searchText.toLowerCase()) || 
             value.problema.nombreCientifico.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    setDataProblema(filteredData);
 };*/

function InfoCultivoProblema ( props ) {
    const { dataProblema } = props;
    const data2 = [];
    const columns = [
      { title: 'Nombre Comun',  dataIndex: 'nombreComun', width: 100, },
      { title: 'Nombre Cientifico', dataIndex: 'nombreCientifico', width: 100,},
      { title: 'Categoria Problema', dataIndex: 'categoriaProblema', width: 100, },
      { title: 'Comentarios', dataIndex: 'comentarios', width: 100, },
     // { title: 'Sintomas', dataIndex: 'sintomas', width: 100, },
      {
        title: 'Accion',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record ) => {
          return dataProblema.length >= 1  ? (
              <Space>
                  <Button type="primary" onClickCapture={() => consultarPlaguicidasAsociados( record )}> 
                     <EyeOutlined/>
                  </Button>
              </Space>
          ) : <Button> jaja</Button>;
        }
      },
    ];

    dataProblema.forEach(element => {
      element.problema.key = element.uid;
      element.problema.problemaUid =  element.problema._id;
      data2.push(element.problema);
   });
   
    return (
      <div className='edit-cultivo-web-form'>
        <Space style={{marginBottom: 16}}>
            <Input
                  placeholder='Ingrese un texto de busqueda'
                  //onChange={handleInputChange}
                  type="text"
                  allowClear
                  //value={searchText}
                />   
            </Space>
            <Button style={{ marginLeft: 15}} onClick={null} type="primary">Buscar</Button>
            <Button onClick={null}>Resetear</Button>
        <Table
          columns={columns}
          dataSource={data2}
          //loading={loading}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 240,
          }}
       />
      </div>
    );
}

const consultarPlaguicidasAsociados = ( record ) => {
  console.log(record);
  getPlaguicidaByProblema( token, record.problemaUid ).then( response => {
    console.log(response);
    if( response.data[0].plaguicida == null ) {
        notification["error"]({
          message: "No hay plaguicidas registrados para atacar el problema"
      });

    } else {
      setIsVisibleModal(true);
      setModalTitle("Plaguicidas Asociados");
      setModalContent(
          <ViewPlaguicidaForm plaguicida={response.data} />
      );
    }
  });
}

  const contentList = {
    tab1: <InfoCultivo cultivo={cultivoData}/>,
    tab2: <InfoCultivoProblema cultivo={cultivoData} dataProblema={ dataProblema }/>
  };

  function ViewCultivoForm ( props ) {
    const {cultivoData, setReloadCultivos } = props; 
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');

    const onTab1Change = (key) => {
        setActiveTabKey1( key);
    };

    return (
        <Card
            style={{
              width: '100%'
            }}
            title={cultivoData.nombreComun }
            //extra={<a href="#">More</a>}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={(key) => {
              onTab1Change(key);
            }}
        >
          {contentList[activeTabKey1]}
        </Card>
    )
}
  
  return (
    <div className='edit-cultivo-web-form' style={{margin:"center"}}>
        <ViewCultivoForm
            cultivoData={cultivoData}
            setReloadCultivos={setReloadCultivos}
        />
        <Modal
                title={modalTitle}
                isVisible = { isVisibleModal }
                setIsVisible = { setIsVisibleModal }
              //  loading={loading}
            >
                {modalContent}
       </Modal>
    </div>
  );
}
