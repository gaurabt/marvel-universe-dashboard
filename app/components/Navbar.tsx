'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {

    const router = useRouter()

    //state for prev/next button in pagination
    const [isActive, setIsActive] = useState('')

    //state for toggling menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')


    //handle search events
    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault()
      if(!searchQuery){
        setSearchQuery('')
      }else{
        //redirect the user to searchresults page
        router.push(`/searchresults?query=${searchQuery}`)
      }
      }
      return (<Navbar className="bg-transparent" onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-emerald-400">MUD</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link 
              className={`link ${isActive === "series" ? "active" : ""}`} 
              href="#" 
              onClick={()=> {setIsActive('series')}}>
              Series
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              className={`link ${isActive === "comics" ? "active" : ""}`} 
              href="#" 
              onClick={()=> {setIsActive('comics')}}>
              Comics
            </Link>
          </NavbarItem>
        </NavbarContent>
        {isMenuOpen && <NavbarContent className="sm:flex flex-col gap-4 bg-[var(--bg-color)] absolute top-[4rem] left-0 right-0 h-[95vh] items-start pl-8 pt-8 transition-all" justify="start">
          <NavbarItem>
            <Link 
              className={`link ${isActive === "series" ? "active" : ""}`} 
              href="#" 
              onClick={()=> {setIsActive('series'); setIsMenuOpen(!setIsMenuOpen)}}>
              Series
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              className={`link ${isActive === "comics" ? "active" : ""}`} 
              href="#" 
              onClick={()=> {setIsActive('comics'); setIsMenuOpen(!setIsMenuOpen)}}>
              Comics
            </Link>
          </NavbarItem>
        </NavbarContent>}
        <NavbarItem className="bg-white rounded-md" >
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              className="outline-none text-black w-[180px] p-2 text-[0.8rem] rounded-l-md"
              placeholder="Search for a Character"
              value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)}/>
            <button 
              className="text-black px-2 hover:text-emerald-400 transition-colors"
              type="submit"
              onClick={handleSearch}
              >Search</button>
          </form>
        </NavbarItem>
      </Navbar>)
}

export default NavBar
