import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    UserIcon,
    UsersIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";

export const sidebarLinks = [
    {
        icon: HomeIcon,
        route: "/",
        label: "Home",
    },
    {
        icon: HashtagIcon,
        route: "/explore",
        label: "Explore",
    },
    {
        icon: BellIcon,
        route: "/notifications",
        label: "Notifications",
    },
    {
        icon: InboxIcon,
        route: "/messages",
        label: "Messages",
    },

    {
        icon: UsersIcon,
        route: "/communities",
        label: "Communities",
    },
    {
        icon: UserIcon,
        route: "/profile",
        label: "Profile",
    },
  {
    icon: DotsCircleHorizontalIcon,
    route: "/more",
    label: "More",
  },
];

export const profileTabs = [
    {value: "tweets", label: "Tweets"},
    {value: "replies", label: "Replies"},
    {value: "likes", label: "Likes"},
];
