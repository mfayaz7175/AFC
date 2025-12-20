// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import { Link } from '@inertiajs/inertia-react';
// export default function MidleCard(props){

//   return(
//     <Col xs={12} md={4}>
//       <Card className="shadow-sm h-100 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
//         <Card.Header>
//           <h5 className="fw-bold">
//             <i className={`${props.icon} sidebar-icon`}></i> {props.title}
//           </h5>
//         </Card.Header>
//         <Card.Body>

//           <p className={ "text-white"}>{props.value}</p>

//         </Card.Body>
//         <Card.Footer>
//         <p className="text-white">
//             <Link href="#" style={{ textDecoration: 'underline' }}>
//               {props.linkText}
//             </Link>
//           </p>
//         </Card.Footer>
//       </Card>
//     </Col>
//     )
// }




import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from '@inertiajs/inertia-react';

export default function MiddleCard(props) {
  // props.routeName should match one of your named routes (e.g. "allowance", "mint", "notify", etc.)
  const href = props.routeName ? route(props.routeName) : (props.link || '#');

  return (
    <Col xs={12} md={4} className="mb-4">
      <Card
        className="relative overflow-hidden shadow-lg h-100 rounded-2xl text-white transform transition-transform hover:scale-105"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
          style={{ filter: 'blur(12px)' }}
        />

        <Card.Header className="relative bg-transparent border-0 pb-0">
          <h5 className="fw-bold text-white">
            <i className={`${props.icon} sidebar-icon mr-2`} />
            {props.title}
          </h5>
        </Card.Header>

        <Card.Body className="relative z-10">
          <p className="text-white text-lg font-medium">{props.value}</p>
        </Card.Body>

        <Card.Footer className="relative bg-transparent border-0 pt-3">
          <Link href={href} className="underline text-white hover:text-gray-300">
            {props.linkText}
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
