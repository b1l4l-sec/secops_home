import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { api } from '../utils/api';
import './Pages.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.events.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const isUpcoming = (eventDate) => {
    return new Date(eventDate) >= new Date();
  };

  const upcomingEvents = events.filter(e => isUpcoming(e.date));
  const pastEvents = events.filter(e => !isUpcoming(e.date));

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Events</h1>
        <p>Join our cybersecurity events, workshops, and competitions</p>
      </motion.div>

      {upcomingEvents.length > 0 && (
        <section className="events-section">
          <h2>Upcoming Events</h2>
          <div className="cards-grid">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event._id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {event.image && (
                  <img
                    src={event.image.startsWith('/uploads') ? `http://localhost:5000${event.image}` : event.image}
                    alt={event.title}
                    className="card-image"
                  />
                )}
                <h3>{event.title}</h3>
                <div className="card-meta">
                  <span>
                    <FiCalendar />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {event.location && (
                    <span>
                      <FiMapPin />
                      {event.location}
                    </span>
                  )}
                </div>
                <p>{event.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section className="events-section">
          <h2>Past Events</h2>
          <div className="cards-grid">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event._id}
                className="card past-event"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {event.image && (
                  <img
                    src={event.image.startsWith('/uploads') ? `http://localhost:5000${event.image}` : event.image}
                    alt={event.title}
                    className="card-image"
                  />
                )}
                <h3>{event.title}</h3>
                <div className="card-meta">
                  <span>
                    <FiCalendar />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {event.location && (
                    <span>
                      <FiMapPin />
                      {event.location}
                    </span>
                  )}
                </div>
                <p>{event.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <p className="no-data">No events available yet</p>
      )}
    </div>
  );
};

export default Events;
