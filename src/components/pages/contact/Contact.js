import { submitContactForm } from '../../../services/petApi';
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData);
      setFormData({ name: '', email: '', question: '' });
      alert('Thank you for your message!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Have questions? We're here to help! Fill out the form below and we'll get back to you soon.</p>
      
      <section className="contact-section">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <textarea
            placeholder="Your Question"
            value={formData.question}
            onChange={(e) => setFormData({...formData, question: e.target.value})}
          ></textarea>
          <button type="submit">Send Question</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;