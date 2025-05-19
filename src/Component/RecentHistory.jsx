const RecentHistory = ({ history, setHistory, setSelectedHistory }) => {

    const clearHistory = () => {
        localStorage.clear();
        setHistory([]);
    }
    return (
        <>
            <div className='col-span-1 bg-zinc-800 pt-5'>

                <h1 className='text-xl text-white flex justify-center items-center gap-4 font-medium'>

                    <span>Recent History</span>

                    <button className='cursor-pointer'
                        onClick={clearHistory}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                    </button>
                </h1>

                <ul className='text-left text-md font-normal overflow-auto mt-2 '>

                    {
                        history && history.map((e, i) => (
                            <li key={i}
                                onClick={() => setSelectedHistory(e)}
                                className='text-zinc-400 truncate px-5 py-1 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200'>
                                {e}
                            </li>
                        ))
                    }

                </ul>
            </div>
        </>
    )
}


export default RecentHistory