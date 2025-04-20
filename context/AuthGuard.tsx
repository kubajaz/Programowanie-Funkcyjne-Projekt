'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user && pathname !== '/') {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [user, pathname, router]);

    if (loading) return null;

    return (
        <>
            {children}
        </>
    );
}
