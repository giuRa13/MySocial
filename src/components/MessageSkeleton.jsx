const MessageSkeleton = () => {
	return (
		<>
			<div className='flex gap-3 '>
				<div className='skeleton w-12 h-12 rounded-full shrink-0  bg-grayM'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-16 w-40 bg-grayM'></div>
				</div>
			</div>
			<div className='flex gap-3 justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-16 w-40 bg-grayM'></div>
				</div>
				<div className='skeleton w-12 h-12 rounded-full shrink-0 bg-grayM'></div>
			</div>
		</>
	);
};
export default MessageSkeleton;