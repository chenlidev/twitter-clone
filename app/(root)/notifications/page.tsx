import Image from "next/image";
import Link from "next/link";
import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {fetchUser, getNotification} from "@/lib/actions/user.actions";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const notification = await getNotification(userInfo._id);

    return (
        <section className='m-10'>
            <h1 className='head-text'>Notifications</h1>

            <section className='mt-10 flex flex-col gap-5'>
                {notification.length > 0 ? (
                    <>
                        {notification.map((notification) => (
                            <Link key={notification._id} href={`/tweet/${notification.parentId}`}>
                                <article className='notification-card'>
                                    <Image
                                        src={notification.author.image}
                                        alt='user_logo'
                                        width={20}
                                        height={20}
                                        className='rounded-full'
                                    />
                                    <p className='!text-small-regular text-dark-1'>
                    <span className='mr-1 text-primary-500'>
                      {notification.author.name}
                    </span>{" "}
                                        replied to your tweet
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className='!text-base-regular text-dark-1'>No notifications yet</p>
                )}
            </section>
        </section>
    );
}

export default Page;
