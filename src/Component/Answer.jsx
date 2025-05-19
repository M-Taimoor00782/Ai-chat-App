/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { checkHeading, replaceHeading } from "./Helper";

const Answer = ({ ans, index, total, type }) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);


    useEffect(() => {

        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeading(answer))
        }

    }, []);

    return (
        <>

            {
                index == 0 && total > 1 ? <span className="text-2xl">{answer}</span> 
                : heading ? <span className="pt-2 block text-xl">{answer}</span>
                : <span className={type == 'q' ? 'pl-1' : 'pl-5'}>{answer}</span>
            }

        </>
    )
}

export default Answer