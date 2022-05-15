import React from 'react';

import Goal from '../components/Website/Goal';
import Footer from '../components/Website/Footer';
import Layout from '../components/Website/Layout';

const impact = () => (
  <Layout>
    <main className="impactGrid">
      <div className="impactCol1">
        <h4 className="impactCol1Title">
          Our core values, mission, and vision
        </h4>
        <p className="impactCol1Paragraph">
          aligns with the United Nation's Sustainable Development Goals (SDG)
        </p>
        <a
          href="#mainSection"
          style={{
            display: 'inherit',
          }}
        >
          <button
            type="button"
            className="discoverBtn btn btn-1"
          >
            <span className="discoverText">
              Discover the goals
            </span>
            <img src="/images/discover.svg" alt="" className="discoverArrow" />
          </button>
        </a>
      </div>
      <div id="mainSection" className=" webpage-container">
        <div className="impactCol2">
          <div className="impactCol2Row1">
            <h2 className="impactCol2Title">
              United Nations’ Sustainable Development Goals
            </h2>
            <p className="impactCol2Paragraph">
              A universal call to action to end poverty, protect the planet and improve the lives and prospects of everyone, everywhere (including gender equality, girls education and women rights). The 17 Goals were adopted by all UN Member States in 2015, as part of the 2030 Agenda for Sustainable Development which set out a 15-year plan to achieve the Goals. See how Abulé intends to address these goals:
            </p>
          </div>
          <div className="impactCol2Row2">
            <div className="mainGoal">
              <img src="/images/mainGoal.png" alt="" className="mainGoalImg" />
              <div className="mainGoalInfo">
                <span className="goalNum">Goal 8</span>
                <h4 className="goalTitle">
                  Decent work and econimic growth
                </h4>
                <p className="goalParagraph">
                  Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all
                </p>
                <div className="strategy btn btn-1">
                  <span className="strategyTitle">Building Communities</span>
                  <span className="focus">strategic focus for 2022</span>
                </div>
              </div>

              <div className="goalBlockInfo">
                <h3 className="goalBlockInfoTitle">
                  Empower Communities
                </h3>
                <p className="goalBlockInfoParagraph">
                  When members are stakeholders in the village and in their tribes, they have more incentive to support and help the community. At Abulé we will reward our members with tokens of appreciation and gratitude when they help the village.
                </p>
              </div>
            </div>
            <div className="goalGrid">
              <Goal 
                goalImg="/images/goal1.png" 
                goalNum="Goal 1" 
                goalTitle="No poverty" 
                goalParagraph="End poverty in all its forms everywhere" 
                // goalBlockInfoTitle="Accessibility & Affordability"
                // goalBlockInfoParagraph="When members are stakeholders in the village and in their tribes, they have more incentive to support and help the community. At Abulé we will reward our members with tokens of appreciation and gratitude when they help the village."
              />
              <Goal 
                goalImg="/images/goal2.png" 
                goalNum="Goal 2" 
                goalTitle="Good health and well-being" goalParagraph="Ensure healthy lives and promote well-being for all at all ages" 
                // goalBlockInfoTitle="Sustainability"
                // goalBlockInfoParagraph="We cannot do it all alone."
              />
              <Goal 
                goalImg="/images/goal3.png" 
                goalNum="Goal 3" 
                goalTitle="Equality education" 
                goalParagraph="Ensure healthy lives and promote well-Ensure inclusive and equitable quality education and promote lifelong learning opportunities for allbeing for all at all ages" 
                // goalBlockInfoTitle="Close the Knowledge Gap"
                // goalBlockInfoParagraph="When we know better, we do better."
              />
              <Goal 
                goalImg="/images/goal4.png" 
                goalNum="Goal 4" 
                goalTitle="Gender equality" 
                goalParagraph="Achieve gender equality and empower all women and girls" 
                // goalBlockInfoTitle="Fair Compensation"
                // goalBlockInfoParagraph="No more pay penalties and career for being a mom. Abulé provides the flexibilty to choose"
              />
              <Goal 
                goalImg="/images/goal5.png" 
                goalNum="Goal 5" 
                goalTitle="Reduced inequalities" 
                goalParagraph="Reduce inequality within and among countries" 
                // goalBlockInfoTitle="Fair Wealth Distribution"
                // goalBlockInfoParagraph="Uplifting those in marginalized communities."
              />
              <Goal 
                goalImg="/images/goal6.png" 
                goalNum="Goal 6" 
                goalTitle="Reduce inequality within and among countries" 
                goalParagraph="Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels" 
                // goalBlockInfoTitle="Accountability"
                // goalBlockInfoParagraph="We are our brothers keeper."
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  </Layout>

);

export default impact;
