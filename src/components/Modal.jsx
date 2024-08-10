
const Modal = ({open, onClose, children}) => {


  return (
    // backdrop
    <div onClick={onClose}
    className={`fixed inset-0 flex justify-center items-center 
      ${open ? "visible" : "invisible"}`}>

    {/* modal */}
    <div className={`rounded-lg shadow w-[80%] lg:w-[40%] max-h-[95vh] border border-greenM1 p-8 transition-all
    bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0
    ${open ? "scale-100 opacity-100" : "scale-125 opacity-100"}`} 
    onClick={(e) => e.stopPropagation()}
    >
    <button type="button" className="absolute top-2 right-2 py-2 px-4 rounded-lg font-bold bg-red hover:opacity-70"
    onClick={onClose}>
        X
    </button>
    
    {children}

    </div>
  </div>
  )

}
 
export default Modal