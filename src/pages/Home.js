import React from "react";
import HomeProducts from "../components/Web/HomeProducts/HomeProducts";
import HowMyProductsWork from "../components/Web/HowMyProductsWork";
import MainBanner from "../components/Web/MainBanner/MainBanner";

export default function Home () {
    return (
        <>
            <MainBanner />
            <HomeProducts />
            <HowMyProductsWork/>
        </>
    )
}