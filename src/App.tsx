import React, { useState } from 'react';
import { PresentationContainer } from './components/layout/PresentationContainer';
import { SLIDES_METADATA } from './data/presentationData';

// Slide Components
import { Slide01Title } from './components/slides/Slide01Title';
import { Slide02Agenda } from './components/slides/Slide02Agenda';
import { Slide03WhatIsAccessControl } from './components/slides/Slide03WhatIsAccessControl';
import { Slide04WhyItMatters } from './components/slides/Slide04WhyItMatters';
import { Slide05AuthnVsAuthz } from './components/slides/Slide05AuthnVsAuthz';
import { Slide06WorkflowAndComponents } from './components/slides/Slide06WorkflowAndComponents';
import { Slide07DAC } from './components/slides/Slide07DAC';
import { Slide08MAC } from './components/slides/Slide08MAC';
import { Slide09RBAC } from './components/slides/Slide09RBAC';
import { Slide10ABAC } from './components/slides/Slide10ABAC';
import { Slide11ModelComparison } from './components/slides/Slide11ModelComparison';
import { Slide12RealWorldApplications } from './components/slides/Slide12RealWorldApplications';
import { Slide13SecurityPrinciples } from './components/slides/Slide13SecurityPrinciples';
import { Slide14SecurityChallenges } from './components/slides/Slide14SecurityChallenges';
import { Slide15ExaminationCaseStudy } from './components/slides/Slide15ExaminationCaseStudy';
import { Slide16ConclusionAndQuiz } from './components/slides/Slide16ConclusionAndQuiz';

export const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = SLIDES_METADATA.length;

  const handlePrev = () => {
    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex(prev => Math.min(totalSlides - 1, prev + 1));
  };

  const handleSelectSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };

  const renderActiveSlide = () => {
    switch (currentSlideIndex) {
      case 0:
        return (
          <Slide01Title 
            onNext={handleNext} 
            onOpenNotes={() => {
              // Trigger notes via custom event or container
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }));
            }} 
          />
        );
      case 1:
        return <Slide02Agenda onNavigateToSlide={handleSelectSlide} />;
      case 2:
        return <Slide03WhatIsAccessControl />;
      case 3:
        return <Slide04WhyItMatters />;
      case 4:
        return <Slide05AuthnVsAuthz />;
      case 5:
        return <Slide06WorkflowAndComponents />;
      case 6:
        return <Slide07DAC />;
      case 7:
        return <Slide08MAC />;
      case 8:
        return <Slide09RBAC />;
      case 9:
        return <Slide10ABAC />;
      case 10:
        return <Slide11ModelComparison />;
      case 11:
        return <Slide12RealWorldApplications />;
      case 12:
        return <Slide13SecurityPrinciples />;
      case 13:
        return <Slide14SecurityChallenges />;
      case 14:
        return <Slide15ExaminationCaseStudy />;
      case 15:
        return <Slide16ConclusionAndQuiz onRestartPresentation={() => setCurrentSlideIndex(0)} />;
      default:
        return <Slide01Title onNext={handleNext} onOpenNotes={() => {}} />;
    }
  };

  return (
    <PresentationContainer
      currentSlideIndex={currentSlideIndex}
      totalSlides={totalSlides}
      onPrev={handlePrev}
      onNext={handleNext}
      onSelectSlide={handleSelectSlide}
    >
      {renderActiveSlide()}
    </PresentationContainer>
  );
};

export default App;
