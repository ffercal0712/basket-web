import { useMemo, useState } from 'react';
import { insforge, isInsforgeConfigured } from '../lib/insforge.js';
import { AdminSessionContext } from './adminSessionContext.js';

const ADMIN_PIN_STORAGE_KEY = 'oksap-admin-pin';

function readStoredPin() {
    if (typeof window === 'undefined') return '';
    return window.sessionStorage.getItem(ADMIN_PIN_STORAGE_KEY) ?? '';
}

function storePin(pin) {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(ADMIN_PIN_STORAGE_KEY, pin);
}

function clearStoredPin() {
    if (typeof window === 'undefined') return;
    window.sessionStorage.removeItem(ADMIN_PIN_STORAGE_KEY);
}

export function AdminSessionProvider({ children }) {
    const [adminPin, setAdminPin] = useState(() => readStoredPin());
    const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => readStoredPin() !== '');
    const [isVerifying, setIsVerifying] = useState(false);

    async function verifyAdminPin(pin) {
        const normalizedPin = pin.trim();

        if (!normalizedPin) {
            return {
                ok: false,
                error: 'Introduce el PIN de administrador.'
            };
        }

        if (!isInsforgeConfigured) {
            return {
                ok: false,
                error: 'La conexión de administración no está configurada.'
            };
        }

        setIsVerifying(true);

        const { error } = await insforge.functions.invoke('save-match-result', {
            body: {
                action: 'verify',
                pin: normalizedPin
            },
            headers: {
                'X-Admin-Pin': normalizedPin
            }
        });

        setIsVerifying(false);

        if (error) {
            setAdminPin('');
            setIsAdminUnlocked(false);
            clearStoredPin();

            return {
                ok: false,
                error: error.message ?? 'PIN de administrador no válido.'
            };
        }

        setAdminPin(normalizedPin);
        setIsAdminUnlocked(true);
        storePin(normalizedPin);

        return { ok: true };
    }

    function lockAdmin() {
        setAdminPin('');
        setIsAdminUnlocked(false);
        clearStoredPin();
    }

    const value = useMemo(() => ({
        adminPin,
        isAdminUnlocked,
        isVerifying,
        isRemoteMode: isInsforgeConfigured,
        verifyAdminPin,
        lockAdmin
    }), [adminPin, isAdminUnlocked, isVerifying]);

    return (
        <AdminSessionContext.Provider value={value}>
            {children}
        </AdminSessionContext.Provider>
    );
}
