"use client";
import React, { useState } from 'react';


const solarCalculatorBasic = () => {
    const [inputs, setInputs] = useState({
        monthlyBill: '',
        homeSize: '',
        electricityRate: 0.12, // Default rate
    });

    const handleInputChange = (field, value) => {
            setInputs(prev => ({
                ...prev,
                [field]: value
            }))
    }
    return (
        <div className='space-y-6'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Monthly Electricity Bill ($):
                </label>
                <input
                    type='number' 
                    value ={inputs.monthlyBill} 
                    onChange={(e) = handleInputChange('monthlyBill', e.target.value)} 
                    className='w-full px-3 py-2 border border-gray-300 rounded md focus:outline-none focus: ring-2 focus: ring-blue-500 text-black'
                    placeholder='Enter your monthly bill'/>
                    <p className='text-xs text-gray-500 mt-1'>
                        Average U.S. household pays $117/month.
                    </p>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Roof size in square feet:
                </label>
                <input
                    type='number' 
                    value ={inputs.homeSize} 
                    onChange={(e) = handleInputChange('homeSize', e.target.value)} 
                    className='w-full px-3 py-2 border border-gray-300 rounded md focus:outline-none focus: ring-2 focus: ring-blue-500 text-black'
                    placeholder='Enter your Roof Size'/>
                    <p className='text-xs text-gray-500 mt-1'>
                        Average U.S. household roof is 1,500-2,000 sq ft.
                    </p>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Electricity Rate ($/kWh):
                </label>
                <input
                    type='number' 
                    step='0.01'
                    value ={inputs.electricityRate} 
                    onChange={(e) = handleInputChange('electricityRate', e.target.value)} 
                    className='w-full px-3 py-2 border border-gray-300 rounded md focus:outline-none focus: ring-2 focus: ring-blue-500 text-black'
                    placeholder='Enter your Electricity Rate'/>
                    <p className='text-xs text-gray-500 mt-1'>
                        Average U.S. electricity rate is $0.12/kWh.
                    </p>
            </div>
            <button 
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-lg transition duration-200'
                onClick={() => alert("Calculation logic coming soon!")}>Calculate Solar Savings</button>
        </div>
    );

}