import React, { useState, useEffect, useRef } from 'react';
import { Space, Table, Tag , Card, Input, Button, notification } from "antd";
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import ViewPlaguicidaForm from '../../Cultivos/ViewPlaguicidaForm/ViewPlaguicidaForm';
import { getDataByCultive, getPlaguicidaByProblema } from '../../../../api/cultivo';
import Highlighter from 'react-highlight-words';

import Modal from '../../../Modal';

export default function ViewConsultorioForm(props) {
  const { cultivo, setReloadCultivos} = props;
  const [ cultivoData, setCultivoData ] = useState({});
  const [ dataProblema, setDataProblema ] = useState({});
  const [ searchText, setSearchText ] = useState("");
  const [ searchedColumn, setSearchedColumn] = useState('');
  const [ modalContent, setModalContent ] = useState(null);
  const [ modalTitle,   setModalTitle ] = useState("");
  const [ isVisibleModal, setIsVisibleModal ] = useState(false);
  const [ loading, setLoading] = useState(false);
  let [ filteredData ] = useState();

  const { Meta } = Card;
  const token = getAccessTokenApi();
  const data2 = [];
  const searchInput = useRef(null);
  /*Seteando dadtos de cultivo */
  useEffect(() => {
    setLoading(true);
    setCultivoData(cultivo);
    setLoading(false);
  }, [cultivo]);

  useEffect(() => {
    setLoading(true);
    getDataByCultive (token , cultivoData.uid ).then( response => {
        if ( response.total > 0 ){
            setDataProblema(response.data);
            setLoading(false);
        }  
    });
  }, [cultivoData]);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    if( selectedKeys[0] === "" ) {
        setDataProblema(dataProblema);
     }
  };

const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    setDataProblema(dataProblema);
};

const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
});

function InfoCultivoProblema ( props ) {
    const { dataProblema } = props;
   
    const columns = [
      { title: 'Nombre Comun',  dataIndex: 'nombreComun', width: 100, ...getColumnSearchProps('nombreComun')},
      { title: 'Nombre Cientifico', dataIndex: 'nombreCientifico', width: 100, ...getColumnSearchProps('nombreCientifico')},
      { title: 'Categoria Problema', dataIndex: 'categoriaProblema', width: 100, ...getColumnSearchProps('categoriaProblema') },
      { title: 'Comentarios', dataIndex: 'comentarios', width: 100, ...getColumnSearchProps('comentarios') },
     // { title: 'Sintomas', dataIndex: 'sintomas', width: 100, },
      {
        title: 'Consultar',
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

    if ( dataProblema.length > 0 ) {
        dataProblema.forEach(element => {
            element.problema.key = element.uid;
            element.problema.problemaUid =  element.problema._id;
            data2.push(element.problema);
         });
    }
   
    return (
      <div className='edit-cultivo-web-form'>
        <Table
          columns={columns}
          dataSource={data2}
          loading={loading}
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
  getPlaguicidaByProblema( token, record.problemaUid ).then( response => {
    if( response.data[0].plaguicida == null ) {
        notification["error"]({
          message: "No hay plaguicidas registrados para atacar el problema"
      });

    } else {
      setIsVisibleModal(true);
      setModalTitle("Plaguicidas registrados para atacar el problema");
      setModalContent(
          <ViewPlaguicidaForm plaguicida={response.data} />
      );
    }
  });
}
  
return (
    <div className='edit-cultivo-web-form' style={{margin:"center"}}>
        <InfoCultivoProblema
            dataProblema={dataProblema}
            cultivo={cultivoData}
            setReloadCultivos={setReloadCultivos}
        />
        <Modal
                title={modalTitle}
                isVisible = { isVisibleModal }
                setIsVisible = { setIsVisibleModal }
                loading={loading}
                width="60%"
            >
                {modalContent}
       </Modal>
    </div>
);
}
