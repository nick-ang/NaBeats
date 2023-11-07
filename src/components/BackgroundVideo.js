import React from "react";
import videoBg from "../assets/videoBg2.mp4"

export default function BackgroundVideo() {
    return
    <div className='main'>
        <video src={videoBg} autoPlay loop muted />
    </div>
}