'use client';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
// import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Define the type for a record
interface Record {
    date: string; // ISO date string
    amount: number; // Amount spent
    category: string; // Expense category
}

const BarChart = ({ records }: { records: Record[] }) => {
    // const { theme } = useTheme();
    // const isDark = theme === 'dark';
    const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop width

    useEffect(() => {
        // Set initial window width
        setWindowWidth(window.innerWidth);

        // Add resize listener
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 640;

    // Aggregate expenses by date
    const aggregateByDate = (records: Record[]) => {
        const dateMap = new Map<
            string,
            { total: number; categories: string[]; originalDate: string }
        >();

        records.forEach((record) => {
            // Parse the date string properly and extract just the date part (YYYY-MM-DD)
            const dateObj = new Date(record.date);
            // Use UTC methods to avoid timezone issues
            const year = dateObj.getUTCFullYear();
            const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getUTCDate()).padStart(2, '0');
            const dateKey = `${year}-${month}-${day}`;
            const existing = dateMap.get(dateKey);

            if (existing) {
                existing.total += record.amount;
                if (!existing.categories.includes(record.category)) {
                    existing.categories.push(record.category);
                }
            } else {
                dateMap.set(dateKey, {
                    total: record.amount,
                    categories: [record.category],
                    originalDate: record.date, // Keep original ISO date for sorting
                });
            }
        });

        // Convert to array and sort by date (oldest to newest)
        return Array.from(dateMap.entries())
            .map(([date, data]) => ({
                date,
                amount: data.total,
                categories: data.categories,
                originalDate: data.originalDate,
            }))
            .sort(
                (a, b) =>
                    new Date(a.originalDate).getTime() -
                    new Date(b.originalDate).getTime()
            );
    };

    const aggregatedData = aggregateByDate(records);

    // Get color based on amount (since we're aggregating multiple categories)
    const getAmountColor = (amount: number) => {
        if (amount > 200)
            return {
                bg: 'rgba(255, 99, 132, 0.3)',
                border: 'rgba(255, 99, 132, 0.8)',
            }; // Red for high spending
        if (amount > 100)
            return {
                bg: 'rgba(255, 206, 86, 0.3)',
                border: 'rgba(255, 206, 86, 0.8)',
            }; // Yellow for medium spending
        if (amount > 50)
            return {
                bg: 'rgba(54, 162, 235, 0.3)',
                border: 'rgba(54, 162, 235, 0.8)',
            }; // Blue for moderate spending
        return {
            bg: 'rgba(75, 192, 192, 0.3)',
            border: 'rgba(75, 192, 192, 0.8)',
        }; // Green for low spending
    };

    // Prepare data for the chart
    const data = {
        labels: aggregatedData.map((item) => {
            // Format date as MM/DD for better readability
            const [, month, day] = item.date.split('-');
            return `${month}/${day}`;
        }),
        datasets: [
            {
                data: aggregatedData.map((item) => item.amount),
                backgroundColor: aggregatedData.map(
                    (item) => getAmountColor(item.amount).bg
                ),
                borderColor: aggregatedData.map(
                    (item) => getAmountColor(item.amount).border
                ),
                borderWidth: 1,
                borderRadius: 2, // Rounded bar edges
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow flexible height
        plugins: {
            legend: {
                display: false, // Remove legend
            },
            title: {
                display: false, // Remove chart title
            },
            tooltip: {
                backgroundColor: 'rgba(31, 41, 55, 0.95)',
                titleColor: '#f9fafb',
                bodyColor: '#374151',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: function (context: { dataIndex: number }) {
                        const dataIndex = context.dataIndex;
                        const item = aggregatedData[dataIndex];
                        const categoriesText =
                            item.categories.length > 1
                                ? `Categories: ${item.categories.join(', ')}`
                                : `Category: ${item.categories[0]}`;
                        return [`Total: $${item.amount.toFixed(2)}`, categoriesText];
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: isMobile ? 12 : 14,
                        weight: 'bold' as const,
                    },
                    color: '#d1d5db',
                },
                ticks: {
                    font: {
                        size: isMobile ? 10 : 12,
                    },
                    color: '#9ca3af', // Gray x-axis labels
                    maxRotation: isMobile ? 45 : 0, // Rotate labels on mobile
                    minRotation: isMobile ? 45 : 0,
                },
                grid: {
                    display: false, // Hide x-axis grid lines
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                    font: {
                        size: isMobile ? 12 : 16, // Smaller font on mobile
                        weight: 'bold' as const,
                    },
                    color: '#d1d5db',
                },
                ticks: {
                    font: {
                        size: isMobile ? 10 : 12, // Smaller font on mobile
                    },
                    color: '#9ca3af', // Gray y-axis labels
                    callback: function (value: string | number) {
                        return '$' + value; // Add dollar sign to y-axis labels
                    },
                },
                grid: {
                    color: '#374151', // Dark mode grid lines
                },
                beginAtZero: true, // Start y-axis at zero for expenses
            },
        },
    };

    return (
        <div className='relative w-full h-64 sm:h-72 md:h-80'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;