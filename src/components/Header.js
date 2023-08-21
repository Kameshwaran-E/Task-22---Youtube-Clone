import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import { BiVideoPlus } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa';
import { toggleMenu } from '../utils/navSlice';
import { cacheResults } from '../utils/searchSlice';
import logo from '../assets/yt-logo.png';
import SearchBar from './SearchBar';
import './Header.css';
import { YOUTUBE_SEARCH_API } from '../utils/constants';

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchCacheResults = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCacheResults[searchQuery]) {
        setSearchSuggestions(searchCacheResults[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    fetch(YOUTUBE_SEARCH_API + searchQuery)
      .then((res) => res.json())
      .then((res) => {
        setSearchSuggestions(res[1]);
        if (searchQuery) dispatch(cacheResults({ [searchQuery]: res[1] }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {!showSearchBar && (
        <div className="flex md:grid-flow-col md:grid justify-between items-center border-b-2 shadow-sm md:shadow-none md:border-none">
          <div className="flex items-center md:col-span-3">
            <button onClick={toggleMenuHandler}>
              <AiOutlineMenu className="hidden md:block mx-4 text-xl cursor-pointer" />
            </button>
            <Link to={'/'} className="flex items-center">
              <img
                className=" w-32  cursor-pointer"
                src={logo}
                alt="Youtube Logo"
              />
            </Link>
          </div>

          <div className="hidden md:block col-span-8">
            <SearchBar
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
              setSearchQuery={setSearchQuery}
              searchSuggestions={searchSuggestions}
            />
          </div>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div className="nav__item">
              <span className="nav__itemLineOne">Hello Guest</span>
              <span className="nav__itemLineTwo">Sign In</span>
            </div>
          </Link>
          <div className="mr-2 p-2 w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
            <BiVideoPlus size={25} className="text-yt-white text-center" />
          </div>
          <div className="mx-3 p-2 w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
            <FaRegBell size={20} className="text-center text-yt-white" />
          </div>
          <div className="flex space-x-2 mr-2 md:mr-4 text-xl md:col-span-1">
            <AiOutlineSearch
              className="md:hidden"
              onClick={() => setShowSearchBar(!showSearchBar)}
            />
          </div>
        </div>
      )}
      {showSearchBar && (
        <SearchBar
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
          setSearchQuery={setSearchQuery}
          searchSuggestions={searchSuggestions}
        />
      )}
    </>
  );
};

export default Header;
