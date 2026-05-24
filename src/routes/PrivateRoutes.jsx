import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

const PrivateRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {

        const verifyToken = async () => {

            try {

                const token = localStorage.getItem('folmondi_token');

                if (!token) {
                    setLoading(false);
                    return;
                }

                await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsValid(true);

            } catch (error) {

                localStorage.removeItem('token');

                setIsValid(false);

            } finally {

                setLoading(false);

            }
        };

        verifyToken();

    }, []);

    if (loading) return <p>Loading...</p>;

    if (!isValid) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default PrivateRoute;