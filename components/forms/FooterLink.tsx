import React from 'react'
import Link from "next/link";

const FooterLink = ({ text, linkText, href}: FooterLinkProps) => {
    return (
        <div className="pt-4 text-center">
            <p className="text-sm text-gray-400">
                {text}{` `}
                <Link href={href} className="footer-link">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}
export default FooterLink
