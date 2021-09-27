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
  let restId;
  // definet renderer for Dishes
  const renderDishes = () => {
    // return (<Dishes dishId={1}> </Dishes>)
    return (<h2>rendered dish list</h2>)
  };

  return (
    <>
      <h2>dish list</h2>
      {/* {alert(`restaurant.js page search word: ${props.search}`)} */}
      <Dishes restId={props.search}> </Dishes>
    </>
  );



}
export default DishList