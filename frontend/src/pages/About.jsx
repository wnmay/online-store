const About = ()=>{
    return(
        <>
        <div className="flex flex-col justify-center item-center m-12 gap-4">
        <div className="text-primary text-center text-4xl font-bold">About Online Store</div>
        <div className="text-xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This project is a full-stack application built using the MERN stack for educational purposes. If you have any recommendations or notice any issues, please feel free to reach out!</div>
        <div className="text-xl"><span className="font-semibold">Note:</span> This project stores images on the local file system due to its current scale and purpose. In the future, storage may be change to a cloud service.</div>
        <div className="text-xl"><span className="font-semibold">My github:</span> <a href="https://github.com/wnmay" className="underline text-primary font-bold hover:text-secondary">Click!</a></div>

        </div>
        </>
    )
}

export default About;