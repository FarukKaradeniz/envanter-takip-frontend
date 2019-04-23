import React from 'react';

import '../styles/AnaSayfa.css';
import PieChart from "recharts/es6/chart/PieChart";
import Pie from "recharts/es6/polar/Pie";
import Tooltip from "recharts/es6/component/Tooltip";

const data = [{name: 'Araba', value: 400}, {name: 'Telefon', value: 300},
    {name: 'Yiyecek', value: 300}, {name: 'Bilgisayar', value: 200},
    {name: 'Giyecek', value: 278}, {name: 'Yedek parça', value: 189}]


export default class AnaSayfa extends React.Component {
    render() {
        return(
            <div className={"flex-center"}>
                <h2 className={"text-center"}>Ana Sayfa</h2>

                <div>
                    <PieChart width={400} height={400}>
                        <Pie isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={140} fill="#0aa2a8"
                             label/>
                        <Tooltip/>
                    </PieChart>
                </div>
            </div>
        );
    }
}