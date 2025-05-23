import {Country, State, City} from "country-state-city"
import { getStateByCode } from "country-state-city/lib/state";


const useLocation = () =>{
    const getCountryByCode = (countryCode: string) => {
        return Country.getAllCountries().find((country) => country.isoCode === countryCode)
    }

    const getSateByCode =(countryCode: string, stateCode: string) => {
        const state = State.getAllStates().find( (state) =>
            state.countryCode === countryCode && state.isoCode === stateCode
        )
        if(!state) return null;
        return state; 
    };

    const getCountryStates = (countryCode: string) =>{
        return State.getAllStates().filter((state => state.countryCode === countryCode))
    }

    const getStateCities = (countrCode: string, stateCode?: string) =>{
            return City.getAllCities().filter((city) => city.countryCode === countrCode && city.stateCode
        );
    }

    return{
        getAllCountries: Country.getAllCountries,
        getCountryByCode,
        getStateByCode,
        getCountryStates,
        getStateCities,
    };
};

export default useLocation;