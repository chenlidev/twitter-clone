import {currentUser} from "@clerk/nextjs";
import UserCard from "../cards/UserCard";
import {fetchUsers} from "@/lib/actions/user.actions";
import News from "@/components/shared/News";

async function RightSidebar() {
    const user = await currentUser();
    if (!user) return null;

    const similarMinds = await fetchUsers({
        userId: user.id,
        pageSize: 4,
    });

    return (
        <section className='rightsidebar'>
            <div className='flex flex-1 flex-col justify-start'>
                <div className="fixed w-full bg-white pb-1 pt-2">
                    <div
                        className="flex items-center w-1/5 rounded-full border-1 border-gray-200 py-1 shadow-sm focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200">
                        <img src='/assets/search-gray.svg' alt="Search" className="h-5 w-5"/>
                        <input
                            className="bg-transparent border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 pl-5"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                </div>
            </div>
            <News/>
            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-heading4-medium text-dark-1'>Who to follow</h3>
                <div className='mt-7 flex w-[350px] flex-col gap-10'>
                    {similarMinds.users.length > 0 ? (
                        <>
                            {similarMinds.users.slice(0, 3).map((person) => (
                                <UserCard
                                    key={person.id}
                                    id={person.id}
                                    name={person.name}
                                    username={person.username}
                                    imgUrl={person.image}
                                />
                            ))}
                        </>
                    ) : (
                        <p className='!text-base-regular text-dark-1'>No users yet</p>
                    )}
                </div>
            </div>

        </section>
    );
}

export default RightSidebar;
