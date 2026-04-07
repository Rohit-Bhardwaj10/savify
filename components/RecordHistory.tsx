import getRecords from '@/app/actions/getrecords';
import RecordHistoryClient from './RecordHistoryClient';

const RecordHistory = async () => {
    const { records, error } = await getRecords();

    if (error) {
        return (
            <div className='glass p-6 rounded-[2rem] border border-zinc-800/50'>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center'>
                        <span className='text-zinc-500 text-lg font-bold'>!</span>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-white uppercase tracking-tight'>
                            Registry Error
                        </h3>
                        <p className='text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1'>
                            Data Retrival Failed
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!records || records.length === 0) {
        return (
            <div className='glass p-8 rounded-[2rem] border border-zinc-800/50 text-center'>
                <div className='w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <span className='text-zinc-600 text-2xl font-bold'>Σ</span>
                </div>
                <h4 className='text-lg font-bold text-white mb-2 tracking-tight'>
                    Zero Balance
                </h4>
                <p className='text-zinc-500 text-xs font-medium max-w-[240px] mx-auto uppercase tracking-widest leading-loose opacity-60'>
                    No transaction entries found in the ledger.
                </p>
            </div>
        );
    }

    return (
        <RecordHistoryClient 
            initialRecords={records.map((record) => ({
                ...record,
                date: String(record.date),
            }))} 
        />
    );
};

export default RecordHistory;