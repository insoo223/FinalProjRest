import { gql, useQuery } from '@apollo/client';
import Dishes from "./dishes"
import { useContext, useState } from 'react';
import AppContext from "./context"

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function DishList(props) {
  const [dishID, setDishID] = useState(0)
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart)

  const GET_DISHES = gql`
    query {
      dishes {
        id
        name
        description
        price
        image {
          url
        } 
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DISHES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.dishes}`)

  let searchQuery = data.dishes.filter((res) => {
    return res.name.toLowerCase().includes(props.search)
  }) || [];

  let dishId = searchQuery[0] ? searchQuery[0].id : null;
  // let restId;
  // define renderer for Dishes
  const renderDishes = () => {
    // return (<Dishes dishId={1}> </Dishes>)
    return (<h2>rendered dish list</h2>)
  };

  {/* {alert(`restaurant.js page search word: ${props.search}`)} */}
  {/* <Dishes restId={props.search}> </Dishes> */}
  if (searchQuery.length > 0) 
  {
    const dishList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={`http://localhost:1337` + res.image.url}
          />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Button color="info" onClick={() => setRestaurantID(res.id)}>{res.name}</Button>
          </div>
        </Card>
      </Col>
    )) //const dishList = searchQuery.map((res) => (

    return (
      <Container>
        <Row xs='3'>
          {dishList}
        </Row>
      </Container>

    )
    } //if (searchQuery.length > 0) 
    else 
    {
      return <h1> No Dishes Found</h1>
    } 

}
export default DishList