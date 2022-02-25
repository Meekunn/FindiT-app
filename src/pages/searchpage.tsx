import React from 'react'
import Search from '../components/search'
import ProfileCard from '../components/profilecard'
import '../style/searchpage.scss'

const SearchPage = () => {
    return(
        <div className='home-wrapper'>
            <div className='home-contain'>
                <div className='side-bar'>
                    <h2>FindiT</h2>
                </div>
                <div className='contents'>
                    <Search />
                    <div className='profile-cards'>
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage