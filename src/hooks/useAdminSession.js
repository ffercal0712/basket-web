import { useContext } from 'react';
import { AdminSessionContext } from '../context/adminSessionContext.js';

export function useAdminSession() {
    const context = useContext(AdminSessionContext);

    if (!context) {
        throw new Error('useAdminSession debe usarse dentro de AdminSessionProvider.');
    }

    return context;
}
