import React from "react";
import "./style/team.css";
import "./style/themify-icons.css";
import "./style/font-awesome.min.css";

const Team = () => {
  // Using two team members for the powerful card effect.
  const teamMembers = [
    {
      name: "Mohammad Mahdi Senator",
      position: "AFC Founder",
      description:
        "Mahdi Senator is a full-time faculty member of the Marketing and Behavioural Science Division at the Sauder School of Business at UBC. He leads the Entrepreneurship Group, teaching actively in both undergraduate and graduate programs.",
      img: "img/member/1.jpg",
    },
    {
      name: "Mohammad Fayaz",
      position: "AFC Founder",
      description:
        "Mohammad Fayaz is a full-time faculty member of the Marketing and Behavioural Science Division at the Sauder School of Business at UBC. He leads the Entrepreneurship Group, teaching actively in both undergraduate and graduate programs.",
      img: "img/member/2.jpg",
    },
  ];

  return (
    <section className="team-section spad">
      <div className="container">
        <div className="section-title text-center">
          <h2>Meet Our Elite Team</h2>
          <p>
            Our cryptocurrency experts are here to power your journey with unparalleled insight!
          </p>
        </div>
        <div className="team-members powerful-cards">
          {teamMembers.map((member, index) => (
            <div className="member powerful-card" key={index}>
              <div className="card-inner">
                {/* Front Side */}
                <div className="card-front">
                  <div
                    className="member-img set-bg"
                    style={{ backgroundImage: `url(${member.img})` }}
                  ></div>
                  <div className="card-content">
                    <h2>{member.name}</h2>
                    <span>{member.position}</span>
                  </div>
                  <div className="card-social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </div>
                </div>


                {/* Back Side */}
                <div className="card-back">
                  {/* Flex container to have image on left and text on right */}
                  <div className="member-meta-container">
                    <div
                      className="member-img mf set-bg"
                      style={{ backgroundImage: `url(${member.img})` }}
                    ></div>
                    <div className="member-meta">
                      <h2>{member.name}</h2>
                      <span>{member.position}</span>
                    </div>
                  </div>
                  <p>{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
