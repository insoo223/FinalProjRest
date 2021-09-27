  if (searchQuery.length > 0) 
  {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={
              `http://localhost:1337` + res.image.url
            }
          />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">

            <Button color="info" onClick={() => setRestaurantID(res.id)}>{res.name}</Button>

          </div>
        </Card>
      </Col>
    ))

    return (

      <Container>
        <Row xs='3'>
          {restList}
        </Row>

        <Row xs='3'>
          {renderDishes(restaurantID)}
        </Row>

      </Container>

    )
  } //if (searchQuery.length > 0) 
  else 
  {
    return <h1> No Restaurants Found</h1>
  }