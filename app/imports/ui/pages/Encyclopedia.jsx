import React from 'react';
import CardPool from '../../../client/CardPool';
import ReactParallaxTilt from 'react-parallax-tilt';
import CardEntries from '../components/CardCloseups';
import { Col, Container, Row } from 'react-bootstrap';

/* Renders the Encyclopedia page for all cards. */
const EncyclopediaCards = () => {
  const { items } = CardPool.cards;

  const newRow = (rarity) => (
    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly' }}>
      <h3 className="encyclopedia-header">{rarity} Star Cards</h3>
      {items.filter(item => item.rarity === rarity)
        .map((item, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div key={index} style={{ margin: '60px 60px 60px 60px'}}>
            <CardEntries card={item} />
          </div>
        ))}
    </div>
  );

  return (
    <>
      <Container id="encyclopedia" fluid className="py-3" style={{ cursor: 'url(cursor.cur), auto' }}>
      <h1 className="text-center">Trading Card Encyclopedia</h1>
      <Row className="py-4">
        <Col xs={2}/>
        <Col style={{ textAlign: 'center' }}>
          <p>ProfTCG uses a rarity system to help determine how cards are awarded to users.</p>
          <p>Each trading card will be assigned one of the following rarities:</p>
          <ul>
            <p>1 Star, 2 Stars, 3 Stars, 4 Stars</p>
          </ul>
          <p>Click on the cards below to see a brief overview of the Professor you selected.<br />Once collected, visit the Your Cards page to see an extended description.</p>
        </Col>
        <Col xs={2}/>
      </Row>
      <div>
        <div style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', marginLeft: '30px', marginRight: '40px', flexDirection: 'column' }}>
          {newRow(1)}
          {newRow(2)}
          {newRow(3)}
          {newRow(4)}
        </div>
      </div>
      </Container>
    </>
  );
};



export default EncyclopediaCards;
