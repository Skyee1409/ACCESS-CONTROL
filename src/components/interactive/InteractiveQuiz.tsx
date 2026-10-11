import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Award, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    if (revealed[currentIndex]) return; // already locked

    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionId });
    setRevealed({ ...revealed, [currentIndex]: true });

    // Check if this was the last question
    if (currentIndex === totalQuestions - 1) {
      setTimeout(() => {
        triggerCompletion();
      }, 1200);
    }
  };

  const triggerCompletion = () => {
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const correct = q.options.find(o => o.isCorrect)?.id;
      if (selected === correct) score++;
    });
    return score;
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setRevealed({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const score = calculateScore();

  return (
    <div className="cyber-card" style={{ padding: '24px', background: 'rgba(14, 22, 41, 0.9)' }}>
      {!isCompleted ? (
        <div>
          {/* Quiz Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} color="#35D5E8" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#F3F6FC' }}>
                ACCESS CONTROL CERTIFICATION ASSESSMENT
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              <span style={{ color: '#A8B3C7' }}>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span style={{
                background: 'rgba(53, 213, 232, 0.15)',
                color: '#35D5E8',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 700
              }}>
                Score: {score} / {Object.keys(revealed).length}
              </span>
            </div>
          </div>

          {/* Scenario Context (if present) */}
          {currentQ.scenario && (
            <div style={{
              background: '#090F1F',
              border: '1px solid #1E3156',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '12.5px',
              color: '#A8B3C7',
              marginBottom: '14px',
              lineHeight: 1.45
            }}>
              <strong style={{ color: '#FFBF69' }}>Operational Scenario: </strong>
              {currentQ.scenario}
            </div>
          )}

          {/* Question Title */}
          <h4 style={{ fontSize: '15px', color: '#F3F6FC', marginBottom: '16px', lineHeight: 1.45 }}>
            {currentQ.question}
          </h4>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {currentQ.options.map(option => {
              const isSelected = selectedAnswers[currentIndex] === option.id;
              const isLocked = !!revealed[currentIndex];
              
              let bg = 'rgba(17, 26, 46, 0.6)';
              let border = '1px solid #1E3156';
              let text = '#E2E8F0';

              if (isLocked) {
                if (option.isCorrect) {
                  bg = 'rgba(54, 211, 153, 0.2)';
                  border = '1px solid #36D399';
                  text = '#36D399';
                } else if (isSelected && !option.isCorrect) {
                  bg = 'rgba(255, 92, 138, 0.2)';
                  border = '1px solid #FF5C8A';
                  text = '#FF5C8A';
                }
              } else if (isSelected) {
                bg = 'rgba(79, 140, 255, 0.2)';
                border = '1px solid #4F8CFF';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isLocked}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: bg,
                    border: border,
                    color: text,
                    cursor: isLocked ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '13px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {option.id}
                    </span>
                    <span>{option.text}</span>
                  </div>

                  {isLocked && option.isCorrect && (
                    <CheckCircle2 size={16} color="#36D399" style={{ flexShrink: 0 }} />
                  )}
                  {isLocked && isSelected && !option.isCorrect && (
                    <XCircle size={16} color="#FF5C8A" style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (when revealed) */}
          {revealed[currentIndex] && (
            <div style={{
              background: 'rgba(53, 213, 232, 0.08)',
              border: '1px solid rgba(53, 213, 232, 0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
              fontSize: '12.5px',
              color: '#F3F6FC',
              lineHeight: 1.5
            }}>
              <strong style={{ color: '#35D5E8' }}>Professor's Analysis: </strong>
              {currentQ.explanation}
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              TAG: {currentQ.conceptTag}
            </span>

            {revealed[currentIndex] && currentIndex < totalQuestions - 1 && (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="cyber-button cyber-button-primary"
                style={{ padding: '6px 16px', fontSize: '12px' }}
              >
                <span>Next Question</span>
                <ArrowRight size={14} />
              </button>
            )}

            {revealed[currentIndex] && currentIndex === totalQuestions - 1 && (
              <button
                onClick={triggerCompletion}
                className="cyber-button cyber-button-cyan"
                style={{ padding: '6px 16px', fontSize: '12px' }}
              >
                <span>View Full Results</span>
                <Trophy size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div style={{ textAlign: 'center', padding: '20px 10px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #35D5E8 0%, #4F8CFF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: '#080D1B',
            boxShadow: '0 0 25px rgba(53, 213, 232, 0.5)'
          }}>
            <Trophy size={32} />
          </div>

          <h3 style={{ fontSize: '22px', color: '#F3F6FC', marginBottom: '6px' }}>
            Assessment Completed!
          </h3>
          <p style={{ fontSize: '13px', color: '#A8B3C7', marginBottom: '20px' }}>
            You have verified your theoretical and practical comprehension of DAC, MAC, RBAC, and ABAC.
          </p>

          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#090F1F',
            border: '1px solid #1E3156',
            borderRadius: '12px',
            padding: '16px 36px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: score >= 4 ? '#36D399' : '#FFBF69', fontFamily: 'var(--font-mono)' }}>
              {score} / {totalQuestions}
            </span>
            <span style={{ fontSize: '12px', color: '#A8B3C7', marginTop: '2px' }}>
              {score === 5 
                ? '🏆 Outstanding! Master-Level Cyber Architect'
                : score >= 4 
                  ? '🛡️ Strong Pass: Certified Access Control Practitioner'
                  : '📚 Good Effort: Review the slides and retake'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => { setIsCompleted(false); setCurrentIndex(0); }}
              className="cyber-button"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Review Question Breakdown
            </button>
            <button
              onClick={handleRestart}
              className="cyber-button cyber-button-primary"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              <RotateCcw size={15} />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
