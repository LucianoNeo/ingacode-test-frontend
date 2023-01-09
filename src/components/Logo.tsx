interface Iprops {
    size: string
}

function Logo(props: Iprops) {
    return (
        <div
            className={`flex flex-row gap-1 text-${props.size}`}>
            <h1 className='text-white'>NEO</h1>
            <h1 className='text-orange-500 font-bold'>TASKS</h1>
        </div>
    )
}

export default Logo