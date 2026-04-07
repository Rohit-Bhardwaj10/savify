import getRecords from '@/app/actions/getrecords';
import BarChart from './barcharts'; // Ensure BarChart.tsx or BarChart.jsx exists in the same directory

const RecordChart = async () => {
    const { records, error } = await getRecords();

    if (error) {
        return (
            <div className='glass p-6 rounded-[2rem] border border-zinc-800/50'>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center'>
                        <span className='text-zinc-500 text-lg font-bold'>!</span>
                    </div>
                    <p className='text-zinc-500 text-xs font-bold uppercase tracking-widest'>
                        Chart Data Stream Failed
                    </p>
                </div>
            </div>
        );
    }

    if (!records || records.length === 0) {
        return (
            <div className='glass p-8 rounded-[2rem] border border-zinc-800/50 text-center'>
                <div className='w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <span className='text-zinc-600 text-2xl font-bold'>ø</span>
                </div>
                <h4 className='text-lg font-bold text-white mb-2 tracking-tight'>
                    Dataset Empty
                </h4>
                <p className='text-zinc-500 text-xs font-medium max-w-[200px] mx-auto uppercase tracking-widest leading-loose opacity-60'>
                    Awaiting financial input to generate visual analytics.
                </p>
            </div>
        );
    }

    return (
        <div className='glass p-8 rounded-[2rem] border border-zinc-800/50'>
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
                        <span className='text-black text-xl font-bold'>Δ</span>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold tracking-tight text-white uppercase'>
                            Fiscal Velocity
                        </h3>
                        <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1'>
                            Real-time expenditure mapping
                        </p>
                    </div>
                </div>
                <div className='hidden sm:flex gap-2'>
                    <div className='w-2 h-2 rounded-full bg-zinc-700'></div>
                    <div className='w-2 h-2 rounded-full bg-zinc-800'></div>
                    <div className='w-2 h-2 rounded-full bg-zinc-900'></div>
                </div>
            </div>
            <div className='overflow-x-auto protocol-chart'>
                <BarChart
                    records={records.map((record) => ({
                        ...record,
                        date: String(record.date),
                    }))}
                />
            </div>
        </div>
    );
};

export default RecordChart;