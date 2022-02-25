import React from "react"

function LeftSidebar() {
    return (
        <div className="bg-white p-2 pb-10 rounded-r-md hidden md:flex flex-col items-start w-64 mr-4">
            <h3 className="mb-20">Topics</h3>

            <div className="flex items-center justify-center w-full cursor-pointer my-4">
                <div className="flex-1 h-[1px] bg-slate-300"></div>

                <p className="mx-2">RTK kojas</p>

                <div className="flex-1 h-[1px] bg-slate-300"></div>
            </div>

            <div className="flex items-center justify-center w-full cursor-pointer my-4">
                <div className="flex-1 h-[1px] bg-slate-300"></div>

                <p className="mx-2">Karjera</p>

                <div className="flex-1 h-[1px] bg-slate-300"></div>
            </div>
        </div>
    )
}

export default LeftSidebar