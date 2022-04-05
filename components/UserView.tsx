import axios from "axios";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { UserDateInterface } from "../interfaces/UserDataInterface";

export default function UserView(props: UserDateInterface) {
    return (
        <div className="card border-0">
            <div className="card-body border-0 flex flex-col md:flex-row items-center gap-10">
                <div>
                    {props.images.length === 0 ? "" : <img className="rounded-full max-w-[13rem] md:max-w-[7rem]" src={props.images[0].url} alt="" />}
                    
                </div>
                <div>
                    <h5 className="card-title">{props.display_name}</h5>
                    <div className="flex">
                        <div className="flex gap-1">
                            <div>Followers</div>
                            <div>{props.followers.total}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
