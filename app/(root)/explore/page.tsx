
function Page() {
    return (
        <section className='m-10'>
            <h1 className='head-text mb-10'>Search</h1>
                <div
                    className="flex items-center w-2/3 rounded-full border-1 border-gray-200 py-1 shadow-sm focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200">
                    <img src='/assets/search-gray.svg' alt="Search" className="h-5 w-5"/>
                    <input
                        className="bg-transparent border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 pl-5"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
            </div>

        </section>
    );
}

export default Page;
