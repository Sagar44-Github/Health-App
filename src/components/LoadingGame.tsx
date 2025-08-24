import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Brain, Target, Gamepad2, Trophy, Star } from 'lucide-react';

interface LoadingGameProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const healthFacts = [
  "Your brain uses 20% of your body's total energy!",
  "A healthy heart beats about 100,000 times per day.",
  "You blink about 15-20 times per minute!",
  "Your body produces 25 million new cells every second!",
  "Laughing can boost your immune system!",
  "Walking 10,000 steps burns about 400-500 calories.",
  "Drinking water helps your brain function better!",
  "Regular sleep improves memory consolidation.",
];

const LoadingGame: React.FC<LoadingGameProps> = ({ isVisible, onComplete }) => {
  const [gameType, setGameType] = useState<'reaction' | 'memory' | 'health-quiz'>('reaction');
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  
  // Reaction Game State
  const [showTarget, setShowTarget] = useState(false);
  const [reactionStart, setReactionStart] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  
  // Memory Game State
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  
  // Health Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const healthQuestions = [
    {
      question: "How many glasses of water should you drink daily?",
      options: ["4-5", "6-8", "10-12", "2-3"],
      correct: 1
    },
    {
      question: "How many hours of sleep do adults need?",
      options: ["5-6", "7-9", "10-12", "4-5"],
      correct: 1
    },
    {
      question: "What's the recommended exercise per week?",
      options: ["30 min", "150 min", "300 min", "60 min"],
      correct: 1
    }
  ];

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentFact(prev => (prev + 1) % healthFacts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Reaction Game
  const startReactionGame = useCallback(() => {
    setGameActive(true);
    setGameType('reaction');
    setTimeout(() => {
      setShowTarget(true);
      setReactionStart(Date.now());
    }, Math.random() * 3000 + 1000);
  }, []);

  const handleReactionClick = useCallback(() => {
    if (showTarget && reactionStart) {
      const time = Date.now() - reactionStart;
      setReactionTime(time);
      setScore(prev => prev + Math.max(1000 - time, 100));
      setShowTarget(false);
      setGameActive(false);
    }
  }, [showTarget, reactionStart]);

  // Memory Game
  const startMemoryGame = useCallback(() => {
    setGameActive(true);
    setGameType('memory');
    const newSequence = [Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setPlayerSequence([]);
    setShowingSequence(true);
    
    // Show sequence
    newSequence.forEach((num, index) => {
      setTimeout(() => {
        setActiveButton(num);
        setTimeout(() => setActiveButton(null), 600);
      }, index * 800);
    });
    
    setTimeout(() => setShowingSequence(false), newSequence.length * 800);
  }, []);

  const handleMemoryClick = useCallback((buttonIndex: number) => {
    if (showingSequence) return;
    
    const newPlayerSequence = [...playerSequence, buttonIndex];
    setPlayerSequence(newPlayerSequence);
    
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameActive(false);
      return;
    }
    
    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + sequence.length * 100);
      const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(nextSequence);
      setPlayerSequence([]);
      setShowingSequence(true);
      
      nextSequence.forEach((num, index) => {
        setTimeout(() => {
          setActiveButton(num);
          setTimeout(() => setActiveButton(null), 600);
        }, index * 800);
      });
      
      setTimeout(() => setShowingSequence(false), nextSequence.length * 800);
    }
  }, [showingSequence, playerSequence, sequence]);

  // Health Quiz
  const startHealthQuiz = useCallback(() => {
    setGameActive(true);
    setGameType('health-quiz');
    setCurrentQuestion(0);
    setQuizScore(0);
  }, []);

  const handleQuizAnswer = useCallback((answerIndex: number) => {
    if (answerIndex === healthQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
      setScore(prev => prev + 200);
    }
    
    if (currentQuestion < healthQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameActive(false);
    }
  }, [currentQuestion]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background/90 backdrop-blur-md border border-border/40 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-2 rounded-lg">
              <Gamepad2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>Loading Games</span>
          </CardTitle>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Trophy className="h-3 w-3" />
              <span>Score: {score}</span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Health Fact Display */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-start space-x-2">
              <Brain className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-primary mb-1">Health Tip #{currentFact + 1}</h4>
                <p className="text-sm text-muted-foreground">{healthFacts[currentFact]}</p>
              </div>
            </div>
          </div>

          {!gameActive ? (
            <div className="space-y-3">
              <h3 className="font-medium text-center">Choose a mini-game to play while loading:</h3>
              <div className="grid gap-2">
                <Button
                  onClick={startReactionGame}
                  variant="outline"
                  className="flex items-center space-x-2 justify-start"
                >
                  <Zap className="h-4 w-4" />
                  <span>Reaction Time Challenge</span>
                </Button>
                <Button
                  onClick={startMemoryGame}
                  variant="outline"
                  className="flex items-center space-x-2 justify-start"
                >
                  <Brain className="h-4 w-4" />
                  <span>Memory Sequence Game</span>
                </Button>
                <Button
                  onClick={startHealthQuiz}
                  variant="outline"
                  className="flex items-center space-x-2 justify-start"
                >
                  <Heart className="h-4 w-4" />
                  <span>Health Knowledge Quiz</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {gameType === 'reaction' && (
                <div className="text-center space-y-4">
                  <h3 className="font-medium">Reaction Time Challenge</h3>
                  <div
                    className={`w-32 h-32 mx-auto rounded-full border-4 border-dashed cursor-pointer transition-all duration-200 flex items-center justify-center ${
                      showTarget 
                        ? 'bg-green-500 border-green-500 scale-110' 
                        : 'bg-muted border-muted-foreground/30'
                    }`}
                    onClick={handleReactionClick}
                  >
                    {showTarget ? (
                      <Target className="h-12 w-12 text-white" />
                    ) : (
                      <span className="text-sm text-muted-foreground">Wait...</span>
                    )}
                  </div>
                  {reactionTime && (
                    <Badge variant="secondary">
                      Reaction Time: {reactionTime}ms
                    </Badge>
                  )}
                </div>
              )}

              {gameType === 'memory' && (
                <div className="text-center space-y-4">
                  <h3 className="font-medium">Memory Sequence - Level {sequence.length}</h3>
                  <div className="grid grid-cols-2 gap-2 max-w-48 mx-auto">
                    {[0, 1, 2, 3].map((index) => (
                      <button
                        key={index}
                        className={`h-16 rounded-lg border-2 transition-all duration-200 ${
                          activeButton === index
                            ? 'bg-primary border-primary scale-95'
                            : 'bg-muted border-muted-foreground/30 hover:border-primary/50'
                        }`}
                        onClick={() => handleMemoryClick(index)}
                        disabled={showingSequence}
                      />
                    ))}
                  </div>
                  <Badge variant="secondary">
                    Sequence Length: {sequence.length}
                  </Badge>
                </div>
              )}

              {gameType === 'health-quiz' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-center">
                    Question {currentQuestion + 1} of {healthQuestions.length}
                  </h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium mb-3">{healthQuestions[currentQuestion].question}</p>
                    <div className="grid gap-2">
                      {healthQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleQuizAnswer(index)}
                          className="justify-start"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Quiz Score: {quizScore}/{healthQuestions.length}
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Badge variant="outline" className="animate-pulse">
              <Star className="h-3 w-3 mr-1" />
              AI is thinking...
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingGame;