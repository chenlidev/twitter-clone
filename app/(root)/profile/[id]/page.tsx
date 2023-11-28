import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {profileTabs} from "@/constants";
import TweetsTab from "@/components/shared/TweetsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {fetchUser} from "@/lib/actions/user.actions";
import ToggleButton from "@/components/shared/ToggleButton";

async function Page({params}: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const labels: string[] = profileTabs.map((tab) => tab.label);

    return (
        <div>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            <div className='mt-9'>
                <Tabs defaultValue='tweets'>
                    <ToggleButton buttonNames={labels} buttonWidth={"6rem"}/>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className='w-full text-dark-1'
                        >
                            <TweetsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

export default Page;
