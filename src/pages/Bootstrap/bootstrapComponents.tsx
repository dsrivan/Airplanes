import React from 'react';
import {
    Container, Table, Jumbotron, Row, Form, FormGroup, Label, Input,
    Card, CardImg, CardText, CardBody, CardTitle, Col, Button
} from 'reactstrap';

const Home = () => {
    return (
        <Container>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-3">Fluid jumbotron</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </Container>
            </Jumbotron>
            <Row>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

            <Container>
                <Row>
                    <Col >
                    <h1>teste</h1>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col md="8">
                    <Form>
                        <FormGroup>
                            <Label for="inputFabricante">Fabricante</Label>
                            <Input id="inputFabricante" valid />
                        </FormGroup>
                        <FormGroup>
                            <Label for="inputModelo">Modelo</Label>
                            <Input id="inputModelo" invalid />
                        </FormGroup>
                        <FormGroup>
                            <Label for="inputNPassageiros">Número de passageiros</Label>
                            <Input id="inputNPassageiros" invalid />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm="4">
                    <Card>
                        <CardImg top width="100%" src="https://image.flaticon.com/icons/svg/3069/3069048.svg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Card Title</CardTitle>
                            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                            <CardText>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="4">
                    <Card>
                        <CardImg top width="100%" src="https://image.flaticon.com/icons/svg/3069/3069048.svg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Card Title</CardTitle>
                            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                            <CardText>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="4">
                    <Card>
                        <CardImg top width="100%" src="https://image.flaticon.com/icons/svg/3069/3069048.svg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Card Title</CardTitle>
                            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                            <CardText>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Button color="danger">
                Button
                </Button>
        </Container>
    );
};

export default Home;