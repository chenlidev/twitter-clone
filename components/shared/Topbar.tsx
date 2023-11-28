import ToggleButton from "@/components/shared/ToggleButton";
import React from "react";

function Topbar() {
    return (
        <nav className='topbar'>
            <ToggleButton buttonNames={["For you", "Following"]} buttonWidth={"8rem"}/>
        </nav>
    );
}

export default Topbar;
