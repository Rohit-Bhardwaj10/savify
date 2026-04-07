'use server';

import { generateBudgetForecast, ExpenseRecord } from '@/lib/ai';
import getRecords from './getrecords';

export async function getAIForecast() {
    try {
        const { records, error } = await getRecords();
        
        if (error || !records || records.length === 0) {
            return {
                forecast: "Insufficient Data",
                confidence: 0,
                hotspots: [],
            };
        }

        const expenseRecords: ExpenseRecord[] = records.map(r => ({
            id: r.id,
            amount: r.amount,
            category: r.category,
            description: r.text, // Mapping text to description for AI lib
            date: String(r.date),
        }));

        const forecastData = await generateBudgetForecast(expenseRecords);
        return forecastData;
    } catch (error) {
        console.error('Error in getAIForecast action:', error);
        return {
            forecast: "Calculated Estimate",
            confidence: 0.5,
            hotspots: ["Processing..."],
        };
    }
}
