import {useState,useEffect} from 'react'
import { Shuffle } from '../../utils';
import './quizContent.css';

const QuizContent = ({allWords}) => {
    const [endGame, setEndGame] = useState(false);
    const [QArray, setQArray] = useState([]);
    const [nmbOfCorrectAnswers, setNmbOfCorrectAnswers] = useState(0);
    const [qno, setQno] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [btnClass, setBtnClass] = useState('');
    const [clickedAnswer, setClickedAnswer] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const newGame=()=>{
        setQArray([]);
        setQno(0);
        setNmbOfCorrectAnswers(0);
    }
    const nextQuestion=()=>{
        setIsCorrect(null);
        setBtnClass('');
        setClickedAnswer(null);
        setQuestion(null);
        setAnswers([]);
        generateQuestion()
    }
    const findQuestion=()=>{
        let findQ=true;
        while(findQ){
            const qWord=allWords[Math.floor(Math.random() * allWords.length)];
            let exist=false;
            for (let i = 0; i < QArray.length; i++) {
                if(QArray[i].id===qWord.id){
                    exist=true;
                }
            }
            if (!exist) {
                findQ=false;
                return qWord;
            }
        }
       
    }
    const generateQuestion=()=>{
        const qWord=findQuestion();
        setQArray([...QArray,qWord]);
        setQuestion(qWord);
        const tmpanswers=[];
        tmpanswers.push(qWord);
        while(tmpanswers.length<4){
            const rndAnswer=allWords[Math.floor(Math.random() * allWords.length)];
            let isExist=false;
            for (let i = 0; i < tmpanswers.length; i++) {
                if(tmpanswers[i]!==undefined){
                    if(tmpanswers[i].id===rndAnswer.id){
                        isExist=true;
                    }
                }
            }
            if (!isExist) {
                tmpanswers.push(rndAnswer)
            }
        }
            setAnswers(Shuffle(tmpanswers))
            setQno((preState)=>preState+1)
    }
    const checkIsCorect=(ans)=>{
        if (qno===10) {
            setEndGame(true);
        }
        setClickedAnswer(ans);
        if(ans.id===question.id){        
            setBtnClass('green')
            setIsCorrect(true);
            setNmbOfCorrectAnswers((ps)=>ps+1);
        }else{
            setIsCorrect(false);
            setBtnClass('red');
        }
    }
    useEffect(() => {
        generateQuestion();
    }, [])
    useEffect(() => {
        if(QArray.length===0 && endGame){
            nextQuestion();
        }
    }, [QArray])
    return (
        <div>
            <h2>Question {qno}/10</h2>
           {question!==null&&<h3>{question.translate}</h3>}
           {answers.map((ans)=><button disabled={isCorrect!==null} className={`${clickedAnswer && clickedAnswer.id===ans.id?'abtn '+btnClass:'abtn'} ${clickedAnswer && ans.id===question.id?'green':''}`}  key={ans.id} onClick={()=>{checkIsCorect(ans)}}>{ans.word}</button>)}
           {isCorrect!==null&&qno<10&&<button className="next" onClick={nextQuestion}>Next</button>}
           {isCorrect!==null&&qno===10&&(<div className="result"><p>Correct answers: {nmbOfCorrectAnswers}</p><button onClick={newGame}>New Game</button></div>)}

        </div>
    )
}

export default QuizContent
