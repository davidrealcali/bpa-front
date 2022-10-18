import React from 'react';
import { Space, Table, Tag , Card, Input, Button, notification } from "antd";

export default function ViewPlaguicidaForm(props) {
  const { plaguicida, loading } = props;
  const dataPlaguicida = [];
  const columns = [
        { title: 'Nombre',  dataIndex: 'nombre', width: 100, },
        { title: 'Registro Ica', dataIndex: 'registroIca', width: 100,},
        { title: 'Tipo egistro', dataIndex: 'tipoRegistro', width: 100, },
        //{ title: 'Comercializador', dataIndex: 'comercializador', width: 100, },
        { title: 'Titular Registro', dataIndex: 'titularRegistro', width: 100, },
        { title: 'Recomendaciones', dataIndex: 'recomendaciones', width: 100, },
        { title: 'Clase Plaguicida', dataIndex: 'clasePlaguicida', width: 100, },
        { title: 'Tipo Vigencia', dataIndex: 'tipoVigecia', width: 100, },
        { title: 'Categoria Toxicologica', dataIndex: 'categoriaToxicologica', width: 100, },
        //{ title: 'Observaciones', dataIndex: 'observaciones', width: 100, },
        { title: 'Formulacion', dataIndex: 'formulacion', width: 100, },
        //{ title: 'Descripcion', dataIndex: 'descripcion', width: 100, },
  ];
  
  plaguicida.forEach(element => {
     element.plaguicida.key = element.plaguicida._id;
     dataPlaguicida.push(element.plaguicida);
  });

  return (
    <div className='edit-plaguicida-web-form'>
    <Space style={{marginBottom: 16}}>
        <Input
              placeholder='Ingrese un texto de busqueda'
              onChange={null}
              type="text"
              allowClear
              value={null}
            />   
        </Space>
        <Button style={{ marginLeft: 15}} onClick={null} type="primary">Buscar</Button>
        <Button onClick={null}>Resetear</Button>
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
