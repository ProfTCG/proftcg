import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Cards } from '../../api/card/Cards';
import ProfCard from '../components/ProfCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Marketplace = () => {
  const { ready, cards } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
  // Get access to all cards in Card collection.
    const subscription = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // retrieve username, error catching: if no user is logged in return null
    const username = Meteor.user() ? Meteor.user().username : null;
    // retrieve all cards excluding user's (cannot trade with your own cards)
    const cardsList = username ? Cards.collection.find({ owner: { $ne: username } }).fetch() : [];
    return {
      cards: cardsList,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container fluid className="py-3" id="marketplace">
      <Row className="text-center">
        <Col>
          <h1>Marketplace</h1>
          <p>Here you can see all cards available for trade from other users!</p>
        </Col>
      </Row>
      <hr className="style-two" />
      <Row className="d-flex justify-content-center">
        {
          cards.filter(prof => prof.isForSale).map((prof, index) => (
            <Col key={index} sm={3} className="text-center py-3">
              <ProfCard profCard={prof} />
              <b>Owner: {prof.owner}</b><br />
              <Link to={`/trade/${prof._id}`} className="btn btn-dark">Request Trade</Link>
            </Col>
          ))
        }
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Marketplace;
