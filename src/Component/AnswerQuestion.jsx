import Answer from './Answer';
const AnswerQuestion = ({item, index})=>{

    return(
        <>
            <div key={index + Math.random()}
                    className={item.typeof == 'q' ? 'flex justify-end' : ''}
                  >

                    {
                      item.typeof == 'q' ? <li className='text-right p-1 border-5 w-fit border-zinc-700 bg-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl font-medium mb-2'>
                        <Answer ans={item.text}
                          key={index + Math.random()} index={index}
                          total={1} type={item.typeof} />
                      </li>
                        : item.text.map((ansItem, i) => (
                          <li className='text-left p-1 my-5'>
                            <Answer ans={ansItem} key={i + Math.random()} index={i} total={item.length}
                              type={item.typeof} />
                          </li>

                        ))
                    }
                  </div>
        </>
    )
}

export default AnswerQuestion