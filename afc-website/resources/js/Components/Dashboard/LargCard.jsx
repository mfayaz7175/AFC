// import Card from 'react-bootstrap/Card';
// import Table from 'react-bootstrap/Table';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { ethers } from 'ethers';
// import React, { useState, useEffect } from 'react';
// import './style/LargCard.css';

// export default function LargCard(props){
//  console.log(props.data)
//   return(

//     <Row className="mb-3">
//       <Col xs={12}>
//         <Card className="shadow-sm rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white">
//             <Card.Header as="h5">{props.title}</Card.Header>
//             <Card.Body>
//               {props.data.length === 0 ? (
//                 <p>No mint events found for your account.</p>
//               ) : (
//                 <Table hover className="table-styled">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Date</th>
//                       <th>Block</th>
//                       <th>Tx Hash</th>
//                       <th>Minted Amount (AFC)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {props.data.map((event, i) => (
//                       <tr key={i}>
//                         <td>{i + 1}</td>
//                         <td>{event.date}</td>
//                         <td>{event.blockNumber}</td>
//                         <td className="break-all">{event.transactionHash}</td>
//                         <td>
//                           {event.args && event.args.value
//                             ? ethers.utils.formatUnits(event.args.value) + " AFC"
//                             : "N/A"}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//   )
// }


import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ethers } from 'ethers';
import './style/LargCard.css';

export default function LargeCard(props) {
  return (
    <Row className="mb-3">
      <Col xs={12}>
        <Card
          className="relative overflow-hidden shadow-lg rounded-2xl text-white transform transition-transform hover:scale-105"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* blurred gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
            style={{ filter: 'blur(12px)' }}
          />

          <Card.Header
            as="h5"
            className="relative bg-transparent border-0 text-lg font-semibold"
          >
            {props.title}
          </Card.Header>
          <Card.Body className="relative">
            {props.data.length === 0 ? (
              <p>No mint events found for your account.</p>
            ) : (
              <Table hover className="table-styled relative z-10">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Block</th>
                    <th>Tx Hash</th>
                    <th>Minted Amount (AFC)</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((event, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{event.date}</td>
                      <td>{event.blockNumber}</td>
                      <td className="break-all">{event.transactionHash}</td>
                      <td>
                        {event.args && event.args.value
                          ? ethers.utils.formatUnits(event.args.value) + ' AFC'
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
