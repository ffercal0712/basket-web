import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminSession } from '../../hooks/useAdminSession.js';

function AdminAccess() {
    const navigate = useNavigate();
    const {
        isAdminUnlocked,
        isVerifying,
        isRemoteMode,
        verifyAdminPin,
        lockAdmin
    } = useAdminSession();
    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await verifyAdminPin(pin);

        if (!result.ok) {
            setMessage(result.error ?? 'No se ha podido iniciar sesión.');
            return;
        }

        setMessage('');
        navigate('/partidos');
    }

    function handleLogout() {
        lockAdmin();
        setPin('');
        setMessage('Sesión de administrador cerrada.');
    }

    return (
        <>
            <div className="page-header page-header--admin">
                <p className="page-header-label">Administración</p>
                <h1 className="page-header-title">Acceso admin</h1>
                <p className="page-header-subtitle">
                    Inicia sesión para cargar resultados desde el móvil o cualquier otro dispositivo.
                </p>
            </div>

            <section className="admin-access-page">
                <div className="admin-access-page-card">
                    {!isRemoteMode && (
                        <p className="admin-results-error">
                            La conexión de administración no está configurada en este entorno.
                        </p>
                    )}

                    {isAdminUnlocked ? (
                        <>
                            <p className="admin-access-page-status">
                                La sesión de administrador está activa.
                            </p>
                            <div className="admin-access-page-actions">
                                <Link to="/partidos" className="admin-access-page-link">
                                    Ir a partidos
                                </Link>
                                <button
                                    type="button"
                                    className="admin-result-action admin-result-action--secondary"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        <form className="admin-access-form" onSubmit={handleSubmit}>
                            <label className="admin-pin-field">
                                <span className="admin-score-label">PIN de administrador</span>
                                <input
                                    type="password"
                                    className="admin-score-input"
                                    value={pin}
                                    onChange={(event) => setPin(event.target.value)}
                                    placeholder="Introduce el PIN"
                                />
                            </label>

                            <button
                                type="submit"
                                className="admin-result-action admin-result-action--primary"
                                disabled={!pin.trim() || isVerifying || !isRemoteMode}
                            >
                                {isVerifying ? 'Comprobando...' : 'Entrar como admin'}
                            </button>
                        </form>
                    )}

                    {message && (
                        <p className="admin-results-message">{message}</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default AdminAccess;
