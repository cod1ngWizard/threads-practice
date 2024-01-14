'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = (e: any) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      // Perform the action you want to trigger
      router.push(`/search?searchString=${searchTerm}`);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        className='p-1.5 px-2 text-white bg-dark-2 rounded'
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />{' '}
      <Link href={`/search?searchString=${searchTerm}`}>
        <Image
          src={'/assets/search-gray.svg'}
          width={25}
          height={25}
          alt='search logo'
        />
      </Link>
    </div>
  );
}

export default SearchBar;
