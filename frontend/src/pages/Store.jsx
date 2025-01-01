import { useState } from "react";
import Filter from "../components/Filter";
import ProductSection from "../components/ProductSection";

const Store = ()=>{
    const [filterAppear,setFilterAppear] = useState(false);
    const toggleFilter = ()=>{
        setFilterAppear(!filterAppear)
    }
    return(
        <>
        <button onClick={toggleFilter}>show</button>
        {filterAppear && <Filter/>}
        <ProductSection/>
        </>
    )
}

export default Store;