import React from 'react';
import Link from "next/link";
import { logoutUser } from '../../../utils/logout';

const Page = () => {
  return (
    <div className='navbar'>
      <div className="nav_part1">
        {/* <img src="logo.png" alt="Logo" /> */}
        <img src="/logo.png" alt="Logo" />

        <Link href="/">Home</Link>
        <Link href="/explore/profile/edit">Create Profile</Link>
      </div>
      <div className="nav_part">
        <Link href="http://localhost:3000/auth/login"><button>Log In</button></Link>
        <Link href="http://localhost:3000/auth/signup"><button>Sign Up</button></Link>
        <button onClick={logoutUser}>Log Out</button>
      </div>
    </div>
  );
}

export default Page;
