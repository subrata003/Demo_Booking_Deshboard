import React, { useState } from "react";
import bookings from "../data/bookings";
import "./BookingTable.css";

const BookingTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedBooking, setExpandedBooking] = useState(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (id) => {
    if (expandedBooking === id) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(id);
    }
  };

  return (
    <div className="booking-container">

      <div className="page-header">
        <div>
          <h1>Booking Logs</h1>
          <p>Manage and monitor all booking records</p>
        </div>
      </div>

      

      <div className="filter-container">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Transit">In Transit</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Booking ID</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Booking Date</th>
            </tr>
          </thead>

          <tbody>

            {filteredBookings.length > 0 ? (

              filteredBookings.map((booking) => (

                <React.Fragment key={booking.id}>

                  <tr
                    className="booking-row"
                    onClick={() => handleRowClick(booking.id)}
                  >

                    <td>{booking.customerName}</td>

                    <td>{booking.bookingId}</td>

                    <td>{booking.pickupLocation}</td>

                    <td>{booking.dropLocation}</td>

                    <td>
                      <span
                        className={`status ${booking.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>₹{booking.amount}</td>

                    <td>{booking.bookingDate}</td>

                  </tr>

                  

                  {expandedBooking === booking.id && (

                    <tr className="details-row">

                      <td colSpan="7">

                        <div className="booking-details">

                          <h3>Booking Details</h3>

                          <div className="details-grid">

                            <div>
                              <strong>Customer:</strong>
                              <span>{booking.customerName}</span>
                            </div>

                            <div>
                              <strong>Phone:</strong>
                              <span>{booking.phone}</span>
                            </div>

                            <div>
                              <strong>Vehicle:</strong>
                              <span>{booking.vehicle}</span>
                            </div>

                            <div>
                              <strong>Driver:</strong>
                              <span>{booking.driver}</span>
                            </div>

                            <div>
                              <strong>Pickup:</strong>
                              <span>{booking.pickupLocation}</span>
                            </div>

                            <div>
                              <strong>Drop:</strong>
                              <span>{booking.dropLocation}</span>
                            </div>

                            <div>
                              <strong>Amount:</strong>
                              <span>₹{booking.amount}</span>
                            </div>

                            <div>
                              <strong>Status:</strong>
                              <span>{booking.status}</span>
                            </div>

                          </div>

                        </div>

                      </td>

                    </tr>

                  )}

                </React.Fragment>

              ))

            ) : (

              <tr>

                <td colSpan="7" className="no-data">
                  No bookings found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      <div className="booking-count">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

    </div>
  );
};

export default BookingTable;