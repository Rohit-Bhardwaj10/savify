import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface ExpenseRecord {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
}

export interface AIInsight {
    id: string;
    type: 'warning' | 'info' | 'success' | 'tip';
    title: string;
    message: string;
    action?: string;
    confidence: number;
}

export async function generateExpenseInsights(
    expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
    try {
        const expensesSummary = expenses.map((expense) => ({
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            date: expense.date,
        }));

        const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights. 
    Return a JSON array of insights with this structure:
    {
      "type": "warning|info|success|tip",
      "title": "Brief title",
      "message": "Detailed insight message with specific numbers when possible",
      "action": "Actionable suggestion",
      "confidence": 0.8
    }

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Focus on:
    1. Spending patterns (day of week, categories)
    2. Budget alerts (high spending areas)
    3. Money-saving opportunities
    4. Positive reinforcement for good habits

    Return only valid JSON array, no additional text.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });

        const response = result.response.text();
        if (!response) {
            throw new Error('No response from AI');
        }

        let cleanedResponse = response.trim();
        if (cleanedResponse.startsWith('```json')) {
            cleanedResponse = cleanedResponse
                .replace(/^```json\s*/, '')
                .replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse
                .replace(/^```\s*/, '')
                .replace(/\s*```$/, '');
        }

        const insights = JSON.parse(cleanedResponse);

        return insights.map((insight: any, index: number) => ({
            id: `ai-${Date.now()}-${index}`,
            type: insight.type || 'info',
            title: insight.title || 'AI Insight',
            message: insight.message || 'Analysis complete',
            action: insight.action,
            confidence: insight.confidence || 0.8,
        }));
    } catch (error) {
        console.error('❌ Error generating AI insights:', error);
        return [
            {
                id: 'fallback-1',
                type: 'info',
                title: 'AI Analysis Unavailable',
                message: 'Unable to generate personalized insights at this time.',
                action: 'Refresh insights',
                confidence: 0.5,
            },
        ];
    }
}

export async function categorizeExpense(description: string): Promise<string> {
    try {
        const prompt = `You are an expense categorization AI. Categorize expenses into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond with only the category name. 
        Categorize this expense: "${description}"`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 20,
            },
        });

        const category = result.response.text()?.trim();
        const validCategories = [
            'Food',
            'Transportation',
            'Entertainment',
            'Shopping',
            'Bills',
            'Healthcare',
            'Other',
        ];

        return validCategories.includes(category || '') ? category! : 'Other';
    } catch (error) {
        console.error('❌ Error categorizing expense:', error);
        return 'Other';
    }
}

export async function generateAIAnswer(
    question: string,
    context: ExpenseRecord[]
): Promise<string> {
    try {
        const expensesSummary = context.map((expense) => ({
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            date: expense.date,
        }));

        const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Provide a response that addresses the question using data and offers actionable advice. Keep it concise (2-3 sentences). 
    Return only the answer text, no additional formatting.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 200,
            },
        });

        const response = result.response.text();
        return response?.trim() || "I'm unable to provide a detailed answer at the moment.";
    } catch (error) {
        console.error('❌ Error generating AI answer:', error);
        return "Unable to generate an answer at this time.";
    }
}

export async function generateBudgetForecast(
    expenses: ExpenseRecord[]
): Promise<{ forecast: string; confidence: number; hotspots: string[] }> {
    try {
        const expensesSummary = expenses.map(expense => ({
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
        }));

        const prompt = `Analyze these financial records and project the likely total spending for the NEXT calendar month.
        Current Data:
        ${JSON.stringify(expensesSummary, null, 2)}

        Return a JSON object with:
        {
          "forecast": "Total projected amount e.g. $2,450.00",
          "confidence": 0.0-1.0,
          "hotspots": ["Category 1", "Category 2"]
        }
        
        Keep it professional and technical. Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        let cleanedResponse = response.trim();
        if (cleanedResponse.startsWith('```json')) {
            cleanedResponse = cleanedResponse
                .replace(/^```json\s*/, '')
                .replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse
                .replace(/^```\s*/, '')
                .replace(/\s*```$/, '');
        }

        const data = JSON.parse(cleanedResponse);

        return {
            forecast: data.forecast || "Undetermined",
            confidence: data.confidence || 0.7,
            hotspots: data.hotspots || [],
        };
    } catch (error) {
        console.error('❌ Error generating AI forecast:', error);
        return {
            forecast: "Calculated Estimate",
            confidence: 0.5,
            hotspots: ["Processing Data"],
        };
    }
}