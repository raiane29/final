import React from "react";
import axios from "axios";
import { Card, Row, Col, Container } from "react-bootstrap";
import {H1, ButtonGet} from '../Styles/PagGetEventos.js'

import '../Styles/PagEventos.css'

const Lista = () => {
  const [eventos, setEventos] = React.useState([]);

  React.useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("http://localhost:3333/eventos/listar");
        if (response.data && Array.isArray(response.data.eventos)) {
          setEventos(response.data.eventos);
        } else {
          setEventos([]);
          console.log(fetchEventos)
          console.log("A resposta da API não contém um array de eventos.");
        }
      } catch (error) {
        console.error("Erro ao listar eventos:", error);
        setEventos([]);
      }
    };

    fetchEventos();
  }, []);

  return (
    <Container className='container'>
      <Row  style={{backgroundColor: "#000"}}  className="justify-content-md-center">
        <Col><H1>Eventos de Empreendedorismo:</H1></Col>
      </Row>
      <Row style={{backgroundColor: "#000"}}>
        <Col sm>    
        <Container striped bordered hover>
      <tbody className="d-flex">
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <React.Fragment key={evento.id}>
              <div className="d-flex justify-content-around">
              <Card className="important-padding2" style={{ width: '355px', height:'355px', background: 'linear-gradient( #2D0065 50%, #5A00CB)',fontSize:'24px'  }}>
                  <Card.Img variant="top" src={`http://localhost:3333/images/${evento.image}`} />
                  <Card.Body>
                    <Card.Title  style={{ color: '#fff', marginLeft: '20px', marginTop: '20px' }}>{evento.titulo}</Card.Title>
                    <Card.Text style={{color:'#fff', width:'344px', marginLeft: '20px', marginTop: '10px', fontSize:'20px' }}>{evento.palestrante}</Card.Text>
                    <Card.Text style={{color:'#fff', width:'344px', marginLeft: '20px', marginTop: '10px', fontSize:'20px' }}>{evento.descricao}</Card.Text>
                    <ButtonGet  className="ButtomEventos" to={'/selecionarEvento'}>Saiba mais</ButtonGet>
                  </Card.Body>
                </Card>
              </div>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{backgroundColor: "#000", color: "#fff"}}>Nenhum evento disponível</td>
          </tr>
        )}
      </tbody>
    </Container></Col>
      </Row>
      </Container>
  );
};

export default Lista;
