// "use client";
// import React, { useState } from "react";

// /**
//  * SESSION 1: BASIC FORM (45 minutes)
//  * 
//  * Learning Objectives:
//  * - Understand React functional components
//  * - Learn useState hook basics
//  * - Create controlled form inputs
//  * - Apply Tailwind CSS classes
//  * 
//  * Key Concepts Covered:
//  * - Component structure
//  * - State management with useState
//  * - Event handling (onChange)
//  * - Controlled inputs pattern
//  * - Basic Tailwind CSS styling
//  */
"use client";
import React, { useState } from "react";

// React Component, arrow function syntax keeps all handlers inside scope 
const SolarCalculatorBasic = () => {
    const [inputs, setInputs] = useState({
        monthlyBill: "",
        homeSize: "",
        electricityRate: 0.12, // Default rate
    });
    // previous spread operator handles the state for changes
    const handleInputChange = (field, value) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Electric Bill ($)
                </label>
                <input
                    type="number"
                    value={inputs.monthlyBill}
                    onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your monthly bill" />
                    <p className="text-xs text-gray-500 mt-1">Average US household: $120-150/month</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Size (sq ft)
                </label>
                <input
                    type="number"
                    value={inputs.homeSize}
                    onChange={(e) => handleInputChange("homeSize", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter home size" />
                    <p className="text-xs text-gray-500 mt-1">Average US home: 2,000-2,500 sq ft</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Electricity Rate $/kWh
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={inputs.electricityRate}
                            onChange={(e) => handleInputChange("electricityRate", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="0.12" />
                            <p className="text-xs text-gray-500 mt-1">
                                US average: $0.12/kWh (varies by state)
                            </p>
                            </div>
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                                onClick = {() => alert("Calculation logic coming in Session 2!")}>Calculate Solar Savings</button>
        </div>
    )
};

export default SolarCalculatorBasic;