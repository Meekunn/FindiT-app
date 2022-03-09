import Search from '../components/search'
import '../style/searchpage.scss'

const SearchPage = () => {
    return (
        <div className='home-wrapper'>
            <div className='home-contain'>
                <div className='side-bar'>
                    <h2>FindiT</h2>
                </div>
                <div className='contents'>
                    <Search />
                </div>
            </div>

        </div>
    );
}

export default SearchPage
