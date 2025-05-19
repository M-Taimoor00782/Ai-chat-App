/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './Constant';
import RecentHistory from './Component/RecentHistory';
import AnswerQuestion from './Component/AnswerQuestion';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('history'))
  );
  const [selectedHistory, setSelectedHistory] = useState('');
  const scroller = useRef();
  const [loader, setLoader] = useState(false);


  const handleQuestion = async () => {

    if (!question && !selectedHistory) {
      return false;
    }


    if (question) {

      if (localStorage.getItem('history')) {
        let questionHistory = JSON.parse(localStorage.getItem('history'));
        questionHistory = [question, ...questionHistory];

        localStorage.setItem('history', JSON.stringify(questionHistory));
        setHistory(questionHistory)
      }
      else {
        localStorage.setItem('history', JSON.stringify([question]));
        setHistory([question]);

      }

    }

    const payloadData = question ? question : selectedHistory;
    const dataLoad = {
      "contents": [{
        "parts": [{ "text": payloadData }]
      }]
    }

    setLoader(true);

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(dataLoad)
    });

    response = await response.json();
    let dataStr = response.candidates[0].content.parts[0].text;
    dataStr = dataStr.split("* ");
    dataStr = dataStr.map((item) => item.trim());

    // console.log(history);

    setResult([...result, { typeof: 'q', text: question ? question : selectedHistory },
    { typeof: 'a', text: dataStr }]);

    setQuestion('');

    setTimeout(() => {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }, 500);

    setLoader(false);

  }

  const isEnter = (e) => {
    if (e.key === 'Enter') {
      handleQuestion();
    }
  }

  useEffect(() => {

    handleQuestion();
    // console.log(selectedHistory);

  }, [selectedHistory])

  return (
    <main className='grid grid-cols-5 h-screen text-center'>

      <RecentHistory history={history} setHistory={setHistory}  
      setSelectedHistory ={setSelectedHistory}/>

      <section className='col-span-4 p-5'>

          <h1 className='text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 font-medium p-2'>
          What can I help with?</h1>

        {
          loader ?
            <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : null
        }

        <div ref={scroller} className='container h-110 overflow-auto custom-scrollbar p-4'>

          <div className='text-zinc-300 p-2'>

            <ul>

              {
                result.map((item, index) => (

                  <AnswerQuestion key={index} item={item} index={index}/>
                ))
              }

            </ul>
          </div>
        </div>

        <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16 mt-6'>

          <input type="text" placeholder='Ask me anything' className='w-full h-full p-3 outline-none'
            value={question}
            onKeyDown={isEnter}
            onChange={(e) => setQuestion(e.target.value)} />

          <button
            className='text-zinc-300 font-medium cursor-pointer'
            onClick={handleQuestion}>Ask</button>

        </div>
      </section>
    </main>
  )
}

export default App
