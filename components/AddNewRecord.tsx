'use client';
import { useRef, useState } from 'react';
import addExpenseRecord from '@/app/actions/addexpenserecord';
import { suggestCategory } from '@/app/actions/suggestcategory';

const AddRecord = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [amount, setAmount] = useState(50); // Default value for expense amount
    const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null); // State for alert type
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner
    const [category, setCategory] = useState(''); // State for selected expense category
    const [description, setDescription] = useState(''); // State for expense description
    const [isCategorizingAI, setIsCategorizingAI] = useState(false); // State for AI categorization loading

    const clientAction = async (formData: FormData) => {
        setIsLoading(true); // Show spinner
        setAlertMessage(null); // Clear previous messages

        formData.set('amount', amount.toString()); // Add the amount value to the form data
        formData.set('category', category); // Add the selected category to the form data

        const { error } = await addExpenseRecord(formData); // Removed `data` since it's unused

        if (error) {
            setAlertMessage(`Error: ${error}`);
            setAlertType('error'); // Set alert type to error
        } else {
            setAlertMessage('Expense record added successfully!');
            setAlertType('success'); // Set alert type to success
            formRef.current?.reset();
            setAmount(50); // Reset the amount to the default value
            setCategory(''); // Reset the category
            setDescription(''); // Reset the description
        }

        setIsLoading(false); // Hide spinner
    };

    const handleAISuggestCategory = async () => {
        if (!description.trim()) {
            setAlertMessage('Please enter a description first');
            setAlertType('error');
            return;
        }

        setIsCategorizingAI(true);
        setAlertMessage(null);

        try {
            const result = await suggestCategory(description);
            if (result.error) {
                setAlertMessage(`AI Suggestion: ${result.error}`);
                setAlertType('error');
            } else {
                setCategory(result.category);
                setAlertMessage(`AI suggested category: ${result.category}`);
                setAlertType('success');
            }
        } catch {
            setAlertMessage('Failed to get AI category suggestion');
            setAlertType('error');
        } finally {
            setIsCategorizingAI(false);
        }
    };

    return (
        <div className='glass p-8 rounded-[2rem] border border-zinc-800/50'>
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center'>
                        <span className='text-zinc-400 text-xl font-bold'>+</span>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold tracking-tight text-white uppercase'>
                            Entry Input
                        </h3>
                        <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1'>
                            Manual transaction logging
                        </p>
                    </div>
                </div>
                <div className='hidden sm:block text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase'>
                    savify-v1 // protocol
                </div>
            </div>

            <form
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(formRef.current!);
                    clientAction(formData);
                }}
                className='space-y-6'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Expense Description */}
                    <div className='space-y-2'>
                        <label
                            htmlFor='text'
                            className='text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1'
                        >
                            Identifier // Description
                        </label>
                        <div className='relative'>
                            <input
                                type='text'
                                id='text'
                                name='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl focus:ring-1 focus:ring-zinc-700 focus:border-zinc-600 text-white placeholder-zinc-600 text-sm transition-all duration-200 outline-none'
                                placeholder='TRANS_DESC_REQUIRED'
                                required
                            />
                            <button
                                type='button'
                                onClick={handleAISuggestCategory}
                                disabled={isCategorizingAI || !description.trim()}
                                className='absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-100 hover:bg-white disabled:bg-zinc-800 text-black disabled:text-zinc-600 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                            >
                                {isCategorizingAI ? 'SYNC' : 'AI_CLASS'}
                            </button>
                        </div>
                    </div>

                    {/* Expense Date */}
                    <div className='space-y-2'>
                        <label
                            htmlFor='date'
                            className='text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1'
                        >
                            Timestamp // Date
                        </label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            className='w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl focus:ring-1 focus:ring-zinc-700 focus:border-zinc-600 text-white text-sm transition-all duration-200 outline-none'
                            required
                            onFocus={(e) => e.target.showPicker()}
                        />
                    </div>

                    {/* Category Selection */}
                    <div className='space-y-2'>
                        <label
                            htmlFor='category'
                            className='text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1'
                        >
                            Sector // Category
                        </label>
                        <select
                            id='category'
                            name='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl focus:ring-1 focus:ring-zinc-700 focus:border-zinc-600 text-white text-sm transition-all duration-200 outline-none cursor-pointer appearance-none'
                            required
                        >
                            <option value='' disabled className='bg-zinc-950'>SELECT_SECTOR</option>
                            <option value='Food' className='bg-zinc-950'>FOOD_&_DINING</option>
                            <option value='Transportation' className='bg-zinc-950'>TRANSPORTATION</option>
                            <option value='Shopping' className='bg-zinc-950'>RETAIL_SHOPPING</option>
                            <option value='Entertainment' className='bg-zinc-950'>ENTERTAINMENT</option>
                            <option value='Bills' className='bg-zinc-950'>BILLS_&_UTILITIES</option>
                            <option value='Healthcare' className='bg-zinc-950'>HEALTHCARE</option>
                            <option value='Other' className='bg-zinc-950'>MISC_OTHER</option>
                        </select>
                    </div>

                    {/* Amount */}
                    <div className='space-y-2'>
                        <label
                            htmlFor='amount'
                            className='text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1'
                        >
                            Magnitude // Amount
                        </label>
                        <div className='relative'>
                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm'>$</span>
                            <input
                                type='number'
                                name='amount'
                                id='amount'
                                min='0'
                                max='1000'
                                step='0.01'
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                                className='w-full pl-8 pr-4 py-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl focus:ring-1 focus:ring-zinc-700 focus:border-zinc-600 text-white font-mono font-bold text-sm transition-all duration-200 outline-none'
                                placeholder='0.00'
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='h-px w-full bg-zinc-800/30 my-6'></div>

                <button
                    type='submit'
                    className='w-full py-4 bg-white hover:bg-zinc-200 text-black rounded-xl font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-[0.98]'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className='flex items-center justify-center gap-3'>
                            <div className='w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin'></div>
                            <span className='text-sm'>EXECUTING_COMMIT</span>
                        </div>
                    ) : (
                        <span className='text-sm'>COMMIT_TRANSACTION</span>
                    )}
                </button>
            </form>

            {alertMessage && (
                <div className={`mt-6 p-4 rounded-xl border ${
                    alertType === 'success' 
                    ? 'bg-zinc-900/50 border-white/10 text-zinc-300' 
                    : 'bg-zinc-900/50 border-white/5 text-zinc-400'
                }`}>
                    <div className='flex items-center gap-3'>
                        <div className={`w-1.5 h-1.5 rounded-full ${alertType === 'success' ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-white/30'}`}></div>
                        <p className='text-[10px] font-mono tracking-wider opacity-80 uppercase'>{alertMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddRecord;