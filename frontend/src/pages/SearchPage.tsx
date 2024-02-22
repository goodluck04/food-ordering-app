import { useSearchRestaurants } from '@/api/RetaurantApi';
import CuisinesFilter from '@/components/CuisinesFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultCart from '@/components/SearchResultCart';
import SearchResultInfo from '@/components/SearchResultInfo';
import SortOptionDropDown from '@/components/SortOptionDropDown';
import { useState } from 'react';
import { useParams } from 'react-router-dom'


export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
}

export default function SearchPage() {
    const { city } = useParams(); //from url

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })

    const [isExpanded, setExpanded] = useState(false);

    const { results, isLoading } = useSearchRestaurants(searchState, city) //passing params

    if (isLoading) {
        <span>Loading...</span>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }))
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }))
    }



    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
        }))
    }


    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div id='cuisines-list'>
                <CuisinesFilter isExpanded={isExpanded} onExpandedClick={() => setExpanded((prevIsExpanded) => !prevIsExpanded)} selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} />
            </div>
            <div id='main-content' className='flex flex-col gap-5'>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder='Search by cuisines or Restaurant Name' onReset={resetSearch} />
                <div className='flex justify-between flex-col gap-3 lg:flex-row'>
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropDown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultCart key={restaurant._id} restaurant={restaurant} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}
