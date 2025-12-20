// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// export default function BigCard(props){
//   return(
//         <Col xs={12} md={6}>
//           <Card className="shadow-sm h-100 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
//           {/* <Card className="shadow-sm h-100 rounded-xl bg-gradient-to-br from-orange-800 via-gray-600 to-pink-500 text-white shadow-xl"> */}
//             <Card.Header>
//               <h5 className='fw-bold text-danger'>{props.title}</h5>
//             </Card.Header>
//               <Card.Body>


//                   <p>
//                     <strong>{props.firstLabel}</strong> {props.first}
//                   </p>
//                   <p>
//                     <strong>{props.secondLabel}</strong> {props.totals.totalMint} AFC
//                   </p>
//                   <p>
//                     <strong>{props.thirdLabel}</strong> {props.third || 'Not connected'}
//                   </p>


//               </Card.Body>
//               <Card.Footer>
//                 <Button variant="secondary">{props.btnName}</Button>
//               </Card.Footer>
//             </Card>
//           </Col>

//   )
// }


// BigCard.jsx
import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from '@inertiajs/inertia-react';

export default function BigCard(props) {
  // Determine target URL: use named route if provided, otherwise fallback to "#"
  const href = props.routeName ? route(props.routeName) : '#';

  return (
    <Col xs={12} md={6} className="mb-4">
      <Card
        className="relative overflow-hidden shadow-lg h-100 rounded-2xl text-white transform transition-transform hover:scale-105"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(7px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Blurred gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
          style={{ filter: 'blur(12px)' }}
        />

        <Card.Header className="relative bg-transparent border-0 pb-0">
          <h5 className="fw-bold text-danger mb-2">{props.title}</h5>
        </Card.Header>

        <Card.Body className="relative pt-0">
          <p className="mb-3">
            <strong>{props.firstLabel}:</strong> {props.first}
          </p>
          <p className="mb-3">
            <strong>{props.secondLabel}:</strong> {props.totals.totalMint} AFC
          </p>
          <p className="mb-0">
            <strong>{props.thirdLabel}:</strong> {props.third || 'Not connected'}
          </p>
        </Card.Body>

        <Card.Footer className="relative bg-transparent border-0 pt-3">
          <Link href={href}>
            <Button
              variant="light"
              className="text-black font-semibold px-4 py-2 rounded-full hover:scale-105 transform transition"
            >
              {props.btnName}
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
