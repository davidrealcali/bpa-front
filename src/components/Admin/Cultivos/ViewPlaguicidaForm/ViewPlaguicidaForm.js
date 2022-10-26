import React  from 'react';
import { Space, Table, Tag , Card, Input, Button, notification } from "antd";
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useState, useRef } from "react";

export default function ViewPlaguicidaForm(props) {
  const [ searchText, setSearchText ] = useState("");
  const [ searchedColumn, setSearchedColumn] = useState('');
  const { plaguicida, loading } = props;
  const searchInput = useRef(null);
  const dataPlaguicida = [];

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

  const columns = [
        { title: 'Nombre',  dataIndex: 'nombre', width: 100, ...getColumnSearchProps('nombre')},
        { title: 'Registro Ica', dataIndex: 'registroIca', width: 100, ...getColumnSearchProps('registroIca')},
        { title: 'Tipo egistro', dataIndex: 'tipoRegistro', width: 100, ...getColumnSearchProps('tipoRegistro')},
        { title: 'Titular Registro', dataIndex: 'titularRegistro', width: 100, ...getColumnSearchProps('titularRegistro') },
        { title: 'Recomendaciones', dataIndex: 'recomendaciones', width: 100, ...getColumnSearchProps('recomendaciones')},
        { title: 'Clase Plaguicida', dataIndex: 'clasePlaguicida', width: 100, ...getColumnSearchProps('clasePlaguicida')},
        { title: 'Tipo Vigencia', dataIndex: 'tipoVigecia', width: 100, ...getColumnSearchProps('tipoVigencia')},
        { title: 'Categoria Toxicologica', dataIndex: 'categoriaToxicologica', width: 100, ...getColumnSearchProps('categoriaToxicologica') },
        { title: 'Formulacion', dataIndex: 'formulacion', width: 100, ...getColumnSearchProps('formulacion')},
  ];

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};
  
plaguicida.forEach(element => {
    element.plaguicida.key = element.plaguicida._id;
    dataPlaguicida.push(element.plaguicida);
});


return (
    <div className='edit-plaguicida-web-form'>
    <Table
      columns={columns}
      dataSource={dataPlaguicida}
      pagination={{
        pageSize: 50,
      }}
       scroll={{
            y: 240,
          }}
   />
  </div>
  )
}
