import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    href: string;
    className?: string;
}

const Navlink: React.FC<Props> = (props) => {
    const router = useRouter();
    return (
        <Link href={props.href}>
            <a
                className={
                    router.pathname == props.href
                        ? props.className + " active"
                        : props.className
                }
                href={props.href}
            >
                {props.children}
            </a>
        </Link>
    );
};

export default Navlink;
