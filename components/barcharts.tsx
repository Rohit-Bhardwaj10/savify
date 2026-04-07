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

    // Get color based on amount - monocrome protocol theme
    const getAmountColor = (amount: number) => {
        if (amount > 200)
            return {
                bg: 'rgba(255, 255, 255, 0.8)',
                border: 'rgba(255, 255, 255, 1)',
            }; // High spending is white
        if (amount > 100)
            return {
                bg: 'rgba(161, 161, 170, 0.6)',
                border: 'rgba(161, 161, 170, 0.9)',
            }; // Medium is zinc-400
        if (amount > 50)
            return {
                bg: 'rgba(113, 113, 122, 0.4)',
                border: 'rgba(113, 113, 122, 0.7)',
            }; // Moderate is zinc-500
        return {
            bg: 'rgba(63, 63, 70, 0.3)',
            border: 'rgba(63, 63, 70, 0.6)',
        }; // Low is zinc-700
    };

    // Prepare data for the chart
    const data = {
        labels: aggregatedData.map((item) => {
            const [, month, day] = item.date.split('-');
            return `${month}/${day}`;
        }),
        datasets: [
            {
                data: aggregatedData.map((item) => item.amount),
                backgroundColor: aggregatedData.map((item) => getAmountColor(item.amount).bg),
                borderColor: aggregatedData.map((item) => getAmountColor(item.amount).border),
                borderWidth: 1,
                borderRadius: 4,
                barThickness: isMobile ? 12 : 24,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                backgroundColor: '#09090b',
                titleColor: '#ffffff',
                bodyColor: '#a1a1aa',
                borderColor: '#27272a',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                titleFont: { size: 12, weight: 'bold' as const },
                bodyFont: { size: 11 },
                usePointStyle: true,
                callbacks: {
                    label: function (context: { dataIndex: number }) {
                        const dataIndex = context.dataIndex;
                        const item = aggregatedData[dataIndex];
                        return ` AMOUNT: $${item.amount.toFixed(2)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                border: { display: false },
                ticks: {
                    font: { size: 10, family: ' Geist Mono, monospace' },
                    color: '#71717a',
                },
                grid: { display: false },
            },
            y: {
                border: { display: false },
                ticks: {
                    font: { size: 10, family: ' Geist Mono, monospace' },
                    color: '#71717a',
                    callback: function (value: string | number) {
                        return '$' + value;
                    },
                },
                grid: {
                    color: 'rgba(39, 39, 42, 0.5)',
                },
                beginAtZero: true,
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