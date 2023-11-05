import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    function gotoUserLogin() {
        navigate('/user/signup');
    }

    const goToList = async () => {
        navigate('/list');
    };

    const goToallKaryakartha = () => {
        navigate('/all');
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, orange, lemonchiffon)',
            }}
        >
            <button
                style={{
                    backgroundColor: '#ff6f61',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '20px',
                }}
                onClick={logout}
            >
                Logout
            </button>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', marginTop: '50px' }}>
                <div
                    style={{
                        width: '300px',
                        height: '100px',
                        backgroundColor: '#8ac6d1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={gotoUserLogin}
                >
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#282c34', textAlign: 'center' }}>
                        Add Karyakartha
                    </span>
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '100px',
                        backgroundColor: '#8ac6d1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={goToallKaryakartha}
                >
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#282c34', textAlign: 'center' }}>
                        List of Karyakartha
                    </span>
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '100px',
                        backgroundColor: '#8ac6d1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={goToList}
                >
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#282c34', textAlign: 'center' }}>
                        Forms submitted by Karyakartha
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
