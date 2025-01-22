import React from 'react';
import Banner from './Banner';
import Partners from './Partners';
import PopularClasses from './PopularClasses';
import FeedbackCarousel from './FeedbackCarousel';
import StatsSection from './StatsSection';
import InspireTeachers from './InspireTeachers';
import OurMission from './OurMission';
import Achievements from './Achievements';

const Home = () => {
    return (
        <div className='bg-background'>
            <Banner></Banner>
            <Partners></Partners>
            <PopularClasses></PopularClasses>
            <FeedbackCarousel></FeedbackCarousel>
            <StatsSection></StatsSection>
            <InspireTeachers></InspireTeachers>
            <OurMission></OurMission>
            <Achievements></Achievements>
        </div>
    );
};

export default Home;