export function Edit(){
    return(
        <form className="mt-[70px] container mx-auto" action="http://localhost:8000/input.php" method="post">
            <header className="flex"><p className="text-[70px] font-serif">Edit Item</p></header>
            <div className="border-x-4 border-4 pb-[20px] px-[20px] rounded-lg border-[#D9EDF7]">
                <input type="text"></input>
            </div>
        </form>
    )
}