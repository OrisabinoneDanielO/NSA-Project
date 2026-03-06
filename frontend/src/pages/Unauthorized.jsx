import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const Unauthorized = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6 gap-5 font-sans">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <AlertTriangle size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Access Denied</h1>
        <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            You don't have permission to view this page. Contact your administrator if you think this is a mistake.
        </p>
        <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition mt-2"
        >
            <ArrowLeft size={16} /> Back to Home
        </Link>
    </div>
);

export default Unauthorized;
