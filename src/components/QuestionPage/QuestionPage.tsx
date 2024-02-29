import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './QuestionPage.css';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { WebSocketService } from '../../services/WebSocketService';
import { generateUUID } from '../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import QuizService from '../../services/QuizService';

const QuestionPage = () => {
  const webSocketService = new WebSocketService();
  const quizService = new QuizService();
  const navigate: NavigateFunction = useNavigate();
  const { roomid } = useParams();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
  ]);
  const [answer, setAnswer] = useState<any>(0);
  const [allQuestions, setAllQuestions] = useState<any>([]);
  const [showForm, setShowForm] = useState(true);

  const optionChange = (index: number, value: string) => {
    const tempOptions = [...options];
    tempOptions[index].value = value;
    setOptions(tempOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allProblems = await quizService.getAllQuestions(roomid);
      if (allProblems) setAllQuestions(allProblems);
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setQuestion('');
    setOptions([
      { id: 1, value: '' },
      { id: 2, value: '' },
      { id: 3, value: '' },
      { id: 4, value: '' },
    ]);
    setAnswer(0);
  };

  const submitQuestion = (e: any) => {
    e.preventDefault();
    const fullProblem = {
      question: question,
      answer: Number.parseInt(answer),
      options: options,
      id: generateUUID(),
      submissions: [],
    };
    if (roomid) {
      webSocketService.addQuestion(roomid, fullProblem);
      setAllQuestions([...allQuestions, fullProblem]);
      setShowForm(false);
    }
    resetForm();
  };

  const startQuiz = () => {
    webSocketService.startQuiz(roomid);
    navigate('/admin-quiz/' + roomid, { state: { problems: allQuestions } });
  };

  return (
    <div className='question-page-container d-flex flex-column justify-content-center align-items-center'>
      <NavBar />
      <div className='add-questions-container w-75 my-5'>
        <div className='row m-0 justify-content-between'>
          {allQuestions.map((ele: any) => (
            <input
              required
              className='form-control my-2'
              value={ele.question}
              disabled
            />
          ))}
        </div>
        {showForm ? (
          <form onSubmit={(e) => submitQuestion(e)}>
            <div className='row m-0 justify-content-between'>
              <input
                required
                name='question-box'
                className='form-control my-4'
                placeholder='Enter Question'
                onChange={(e) => setQuestion(e.target.value)}
              />
              {options.map((ele, index) => (
                <div key={index} className='col-5 my-2 p-0'>
                  <input
                    required
                    className='option-box form-control'
                    placeholder={'Enter option ' + ele.id}
                    onChange={(e) => optionChange(index, e.target.value)}
                  />
                </div>
              ))}
              <div className='col-12 my-2 p-0'>
                <input
                  required
                  name='answer'
                  type='number'
                  min={1}
                  max={4}
                  className='option-box form-control'
                  placeholder='Enter Answer Number'
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            </div>
            <button className='btn btn-primary question-submit-btn my-4'>
              Submit
            </button>
          </form>
        ) : (
          ''
        )}
        {showForm ? (
          ''
        ) : (
          <button
            className='add-question-btn'
            onClick={() => setShowForm(true)}
          >
            <FontAwesomeIcon icon={faPlus} color='black' />
          </button>
        )}
        <button
          className='btn btn-primary start-btn align-self-center'
          disabled={allQuestions.length == 0}
          onClick={() => startQuiz()}
        >
          Start quiz
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
