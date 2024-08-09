
const Spinner = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[6rem] h-[6rem] border-4 border-grayM rounded-full
        border-b-greenM1 animate-spin'
        role='status'>
        </div>
        <span className='ml-2'>Loading...</span>
    </div>
  )
}

export default Spinner