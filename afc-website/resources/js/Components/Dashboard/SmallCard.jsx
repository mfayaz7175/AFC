// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// export default function SmallCard(props){
//   return(
//     <Col xs={12} md={3}>
//       <Card className="shadow-xl h-100 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
//   <Card.Header>
//     <h5 className="font-bold text-lg">{props.label}</h5>
//   </Card.Header>
//   <Card.Body>
//     <p className="text-xl">{props.value} AFC</p>
//   </Card.Body>
// </Card>


//     </Col>
//   )
// }

import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function SmallCard(props) {
  return (
    <Col xs={12} md={3} className="mb-4">
      <Card
        className="relative overflow-hidden shadow-lg h-100 rounded-2xl text-white transform transition-transform hover:scale-105"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-40"
          style={{ filter: 'blur(10px)' }}
        />

        <Card.Header className="relative bg-transparent border-0 pb-1">
          <h5 className="font-bold text-lg text-yellow-500">{props.label}</h5>
        </Card.Header>

        <Card.Body className="relative z-10 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold">{props.value} AFC</p>
        </Card.Body>
      </Card>
    </Col>
  );
}

