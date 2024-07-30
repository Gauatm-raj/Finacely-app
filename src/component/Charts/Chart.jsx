import React from 'react'
import { Line, Pie } from '@ant-design/charts';

const Chart = ({sortedTrans}) => {

    let data = sortedTrans.map((item)=>{
        return {date:item.date,amount:item.amount}
    })

    let sortedPie=sortedTrans.filter((item)=>{
        if(item.type=="expense"){
            return{tag:item.tag,amount:item.amount}
        }
    })

    let finalSpending=sortedPie.reduce((acc,obj)=>{
        let key=obj.tag;
        if(!acc[key]){
            acc[key]={tag:obj.tag,amount:obj.amount}
        }else{
            acc[key].amount+=obj.amount;
        }
        return acc;
    },{});

    console.log(finalSpending);

      const config = {
        data,
        width:800,
        xField: 'date',
        yField: 'amount',
      };

      const pieConfig = {
        data:Object.values(finalSpending),
        width: 400,
        angleField: 'amount',
        colorField: 'tag',
        label: {
            text: 'amount',
            style: {
              fontWeight: 'bold',
            },
          },
          legend: {
            color: {
              title: false,
              position: 'right',
              rowPadding: 5,
            },
          },
      };
    
      return (
        <>
         <div className='wrapper-chart'>
            <div >
                <h2>Flow Chart</h2>
                <Line {...config} />
            </div>
            <div >
                <h2>Spending Pie</h2>
                <Pie {...pieConfig}/>
            </div>
        
         </div>
        </>
      );
}

export default Chart