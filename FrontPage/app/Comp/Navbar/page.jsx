import React from 'react';
import Link from "next/link";

const Page = () => {
  return (
    <div className='navbar'>
      <div className="nav_part1">
        <img src="logo.png" alt="Logo" />
        <Link href="/">Home</Link>
        <Link href="/explore/profile/edit">Create Profile</Link>
      </div>
      <div className="nav_part">
        <Link href="/login"><button>Log In</button></Link>
        <Link href="/signup"><button>Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Page;
