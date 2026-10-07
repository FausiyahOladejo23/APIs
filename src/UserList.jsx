import { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );

                setListOfUsers(response.data);
            } catch (error) {
                setError("Failed to fetch users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = listOfUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <h2>Loading users...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="user-container">
            <h1>User List</h1>

            <input
                type="text"
                placeholder="Search users by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="user-list">
                {filteredUsers.map((user) => (
                    <div
                        className="user-card"
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                    >
                        <h2>{user.name}</h2>

                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>

                        <p>
                            <strong>Company:</strong> {user.company.name}
                        </p>

                        {selectedUser?.id === user.id && (
                            <div className="user-details">
                                <p>
                                    <strong>Address:</strong>{" "}
                                    {user.address.street}, {user.address.city}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {user.phone}
                                </p>

                                <p>
                                    <strong>Website:</strong> {user.website}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedUser(null);
                                    }}
                                >
                                    Hide Details
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default UserList;