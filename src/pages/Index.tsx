import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const quizQuestions = [
    {
      question: 'Что является главной задачей режиссёра?',
      options: [
        'Написание сценария',
        'Создание целостного художественного видения проекта',
        'Операторская работа',
        'Монтаж фильма'
      ],
      correct: 1
    },
    {
      question: 'Какой элемент НЕ входит в обязанности режиссёра?',
      options: [
        'Работа с актёрами',
        'Финансирование проекта',
        'Композиция кадра',
        'Выбор локаций'
      ],
      correct: 1
    },
    {
      question: 'Что такое "мизансцена"?',
      options: [
        'Музыкальное сопровождение',
        'Расположение актёров и объектов в кадре',
        'Освещение сцены',
        'Текст диалогов'
      ],
      correct: 1
    }
  ];

  const materials = [
    {
      icon: 'Clapperboard',
      title: 'Основы режиссуры',
      description: 'Введение в профессию: история, теория и практические основы кинорежиссуры'
    },
    {
      icon: 'Video',
      title: 'Работа с актёрами',
      description: 'Техники направления актёров, методы актёрской игры и взаимодействие на площадке'
    },
    {
      icon: 'Film',
      title: 'Визуальное повествование',
      description: 'Композиция кадра, работа с цветом, светом и движением камеры'
    },
    {
      icon: 'Camera',
      title: 'Технические аспекты',
      description: 'Взаимодействие с оператором, звукорежиссёром и монтажёром'
    }
  ];

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegistered(true);
    toast({
      title: "Регистрация успешна!",
      description: "Теперь вы можете пройти опрос и получить доступ к материалам",
    });
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (parseInt(answer) === quizQuestions[index].correct) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-primary via-purple-600 to-accent min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            МАМИНА
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
            Образовательная платформа о режиссуре: от теории до практики
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Узнать больше
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Регистрация
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">Регистрация</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Зарегистрироваться
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="about" className="text-base">О режиссуре</TabsTrigger>
            <TabsTrigger value="materials" className="text-base">Материалы</TabsTrigger>
            <TabsTrigger value="quiz" className="text-base">Опрос</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Что такое режиссура?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Режиссура — это искусство создания целостного художественного произведения через координацию всех элементов кинопроизводства
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 hover:border-primary transition-colors animate-slide-up">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Lightbulb" className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-display">Творческое видение</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Режиссёр формирует художественную концепцию проекта, определяя визуальный стиль, ритм и эмоциональное воздействие произведения
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary transition-colors animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Icon name="Users" className="text-accent" size={24} />
                    </div>
                    <CardTitle className="font-display">Работа с командой</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Координация работы актёров, оператора, художника, композитора и других специалистов для достижения единой цели
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary transition-colors animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon name="Sparkles" className="text-secondary" size={24} />
                    </div>
                    <CardTitle className="font-display">Технические навыки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Понимание технологий съёмки, монтажа, звука и других аспектов кинопроизводства для эффективной реализации замысла
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary transition-colors animate-slide-up" style={{animationDelay: '0.3s'}}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                      <Icon name="Target" className="text-purple-500" size={24} />
                    </div>
                    <CardTitle className="font-display">Принятие решений</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ежедневное принятие множества творческих и организационных решений, которые формируют финальный результат
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="animate-fade-in">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Образовательные материалы
                </h2>
                <p className="text-lg text-muted-foreground">
                  {isRegistered 
                    ? "Изучайте режиссуру через структурированные курсы и практические задания"
                    : "Зарегистрируйтесь для доступа к полной библиотеке материалов"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {materials.map((material, index) => (
                  <Card 
                    key={index} 
                    className={`border-2 hover:border-primary transition-all hover:scale-105 ${!isRegistered && 'opacity-60'}`}
                  >
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon name={material.icon as any} className="text-white" size={32} />
                      </div>
                      <CardTitle className="font-display text-2xl">{material.title}</CardTitle>
                      <CardDescription className="text-base">{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        disabled={!isRegistered}
                        variant={isRegistered ? "default" : "outline"}
                      >
                        {isRegistered ? "Начать изучение" : "Требуется регистрация"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Опрос: Кто такой режиссёр?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Проверьте свои знания о профессии режиссёра
                </p>
              </div>

              {!isRegistered ? (
                <Card className="border-2 border-primary/50">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl text-center">
                      Для прохождения опроса необходима регистрация
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6">
                      Зарегистрируйтесь, чтобы получить доступ к интерактивному опросу и узнать больше о профессии режиссёра
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg">Регистрация</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-display text-2xl">Регистрация</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleRegister} className="space-y-4">
                          <div>
                            <Label htmlFor="name2">Имя</Label>
                            <Input id="name2" placeholder="Ваше имя" required />
                          </div>
                          <div>
                            <Label htmlFor="email2">Email</Label>
                            <Input id="email2" type="email" placeholder="email@example.com" required />
                          </div>
                          <div>
                            <Label htmlFor="password2">Пароль</Label>
                            <Input id="password2" type="password" placeholder="••••••••" required />
                          </div>
                          <Button type="submit" className="w-full">
                            Зарегистрироваться
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ) : showResults ? (
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="font-display text-3xl text-center">
                      Результаты опроса
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <div className="text-6xl font-display font-bold text-primary">
                      {calculateScore()} / {quizQuestions.length}
                    </div>
                    <p className="text-xl text-muted-foreground">
                      {calculateScore() === quizQuestions.length 
                        ? "Отлично! Вы прекрасно разбираетесь в режиссуре!" 
                        : calculateScore() >= quizQuestions.length / 2
                        ? "Хороший результат! Продолжайте изучать профессию!"
                        : "Изучите материалы, чтобы узнать больше о режиссуре!"}
                    </p>
                    <Button onClick={resetQuiz} size="lg">
                      Пройти заново
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">
                        Вопрос {currentQuestion + 1} из {quizQuestions.length}
                      </span>
                      <div className="flex gap-1">
                        {quizQuestions.map((_, index) => (
                          <div 
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index < currentQuestion ? 'bg-primary' : 
                              index === currentQuestion ? 'bg-primary/50' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="font-display text-2xl">
                      {quizQuestions[currentQuestion].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup onValueChange={handleAnswer}>
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer"
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label 
                            htmlFor={`option-${index}`} 
                            className="flex-1 cursor-pointer text-base"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-secondary text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-display font-bold mb-4">МАМИНА</h3>
          <p className="text-white/70 mb-6">
            Образовательная платформа о режиссуре
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              О проекте
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              Контакты
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              Материалы
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
