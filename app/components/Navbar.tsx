'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {

    const router = useRouter()

    const [isActive, setIsActive] = useState('')

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault()
      if(!searchQuery){
        setSearchQuery('')
      }else{
        //redirect the user to searchresults page
        router.push(`/searchresults?query=${searchQuery}`)
      }
      }
      return (<Navbar className="bg-transparent">
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
          <NavbarItem className="bg-white rounded-md" >
            <input 
              type="text" 
              className="outline-none text-black p-2 text-small rounded-l-md"
              placeholder="Search for a Character"
              value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)}/>
            <button 
              className="text-black px-2 hover:text-emerald-400 transition-colors"
              type="submit"
              onClick={handleSearch}>Search</button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>)
}

export default NavBar
