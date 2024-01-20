const DataBox = ({ data, color, message }: { data: string, color: string, message: string }) => {
    return (
        <div className='mt-12'>
            <div className={`${color} xl:flex text-white w-96 h-20 xl:justify-center flex flex-col justify-center items-center xl:items-center`}>
                <h1 className='text-4xl font-bold'>{data}</h1>
                <h1 className='text-lg'>{message}</h1>
            </div>
        </div>
    )
}

export default DataBox
