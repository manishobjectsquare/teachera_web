import React, { useState, useEffect } from 'react';

const MySells = () => {
    // State for orders data
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1
    });

    // Format currency helper function
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Calculate commission amount
    const calculateCommission = (price, commissionRate) => {
        const commissionAmount = price * (commissionRate / 100);
        return price - commissionAmount;
    };

    // Fetch orders data
    useEffect(() => {
        setLoading(true);

        // In a real app, you would fetch data from an API
        // For now, we'll use mock data
        const mockOrders = [
            {
                id: 1,
                course: {
                    id: 101,
                    title: 'Web Development Fundamentals'
                },
                order: {
                    id: 201,
                    user: {
                        id: 301,
                        name: 'John Smith'
                    }
                },
                price: 49.99,
                commission_rate: 30
            },
            {
                id: 2,
                course: {
                    id: 102,
                    title: 'Advanced JavaScript Concepts'
                },
                order: {
                    id: 202,
                    user: {
                        id: 302,
                        name: 'Emily Johnson'
                    }
                },
                price: 79.99,
                commission_rate: 30
            },
            {
                id: 3,
                course: {
                    id: 103,
                    title: 'React for Beginners'
                },
                order: {
                    id: 203,
                    user: {
                        id: 303,
                        name: 'Michael Brown'
                    }
                },
                price: 59.99,
                commission_rate: 30
            },
            {
                id: 4,
                course: {
                    id: 104,
                    title: 'Data Science with Python'
                },
                order: {
                    id: 204,
                    user: {
                        id: 304,
                        name: 'Sarah Wilson'
                    }
                },
                price: 89.99,
                commission_rate: 30
            },
            {
                id: 5,
                course: {
                    id: 105,
                    title: 'UI/UX Design Principles'
                },
                order: {
                    id: 205,
                    user: {
                        id: 305,
                        name: 'David Lee'
                    }
                },
                price: 69.99,
                commission_rate: 30
            }
        ];

        setOrders(mockOrders);
        setPagination({
            currentPage: 1,
            totalPages: Math.ceil(mockOrders.length / 10) // Assuming 10 items per page
        });
        setLoading(false);
    }, []);



    return (
        <div className="col-lg-9">
            <div className="card">
                <div className="card-header">
                    <h4 className="mb-0">Order History</h4>
                </div>
                <div className="card-body">
                    {loading ? (
                        <p className="text-center">Loading orders...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Course</th>
                                        <th>Buyer</th>
                                        <th>Main Price</th>
                                        <th>Your Commission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No orders found!</td>
                                        </tr>
                                    ) : (
                                        orders.map((order, index) => {
                                            const commissionAmount = calculateCommission(order.price, order.commission_rate);

                                            return (
                                                <tr key={order.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{order.course.title}</td>
                                                    <td>{order.order.user.name}</td>
                                                    <td>{formatCurrency(order.price)}</td>
                                                    <td>{formatCurrency(commissionAmount)}</td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default MySells;