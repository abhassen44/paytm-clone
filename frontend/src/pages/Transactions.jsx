// TransactionHistory.jsx
import { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { FiArrowUp, FiArrowDown, FiSearch, FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (!token) return navigate('/signin');

                const [transactionsRes, userRes] = await Promise.all([
                    axios.get('/api/v1/account/transactions', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('/api/v1/user/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);

                setTransactions(transactionsRes.data.transactions);
                setUserName(userRes.data.firstName);
                setLoading(false);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/signin');
                } else {
                    console.error('Error fetching transactions:', err);
                    setError('Failed to fetch transactions');
                    setLoading(false);
                }
            }
        };

        fetchTransactions();
    }, [navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter =
            filterType === "all" ||
            (filterType === "credit" && transaction.type === "credit") ||
            (filterType === "debit" && transaction.type === "debit");

        const search = searchTerm.toLowerCase();
        const matchesSearch =
            transaction.from.firstName.toLowerCase().includes(search) ||
            transaction.from.lastName.toLowerCase().includes(search) ||
            transaction.from.username.toLowerCase().includes(search) ||
            transaction.to.firstName.toLowerCase().includes(search) ||
            transaction.to.lastName.toLowerCase().includes(search) ||
            transaction.to.username.toLowerCase().includes(search);

        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Appbar userName={userName} />
                <div className="container mx-auto px-4 py-8 animate-pulse">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Transaction History</h1>
                    <div className="bg-white dark:bg-gray-800 rounded shadow-md p-6">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Appbar userName={userName} />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Transaction History</h1>
                    <div className="bg-white dark:bg-gray-800 rounded shadow-md p-6 text-red-500 dark:text-red-400">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Appbar userName={userName} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Transaction History</h1>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                        <div className="flex gap-2">
                            {['all', 'credit', 'debit'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-2 rounded-md capitalize ${filterType === type ? (
                                        type === 'credit' ? 'bg-green-500 text-white' :
                                        type === 'debit' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                                    ) : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
                                >
                                    {type === 'credit' ? <FiArrowDown className="inline mr-1" /> :
                                     type === 'debit' ? <FiArrowUp className="inline mr-1" /> : null}
                                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            />
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No transactions found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        {['Type', 'Amount', 'From', 'To', 'Date'].map(head => (
                                            <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredTransactions.map(transaction => (
                                        <tr key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`p-2 rounded-full mr-2 ${transaction.type === 'credit' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                                                        {transaction.type === 'credit' ? <FiArrowDown className="text-green-500 dark:text-green-400" /> : <FiArrowUp className="text-red-500 dark:text-red-400" />}
                                                    </div>
                                                    <span className={`font-medium ${transaction.type === 'credit' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                                        {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">₹{transaction.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {transaction.from.firstName} {transaction.from.lastName}
                                                <div className="text-xs text-gray-500 dark:text-gray-400">@{transaction.from.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {transaction.to.firstName} {transaction.to.lastName}
                                                <div className="text-xs text-gray-500 dark:text-gray-400">@{transaction.to.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center">
                                                    <FiCalendar className="mr-2" />
                                                    {formatDate(transaction.timestamp)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
