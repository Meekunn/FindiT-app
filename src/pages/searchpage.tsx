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


{/* <ReactSearchAutocomplete
    
    styling={{
        height: "34px",
        border: "1px solid darkgreen",
        borderRadius: "4px",
        backgroundColor: "white",
        boxShadow: "none",
        hoverBackgroundColor: "lightgreen",
        color: "darkgreen",
        fontSize: "12px",
        fontFamily: "Courier",
        iconColor: "green",
        lineColor: "lightgreen",
        placeholderColor: "darkgreen",
        clearIconMargin: "3px 8px 0 0",
        zIndex: 4 }} 
        
autoFocus
/>             */}