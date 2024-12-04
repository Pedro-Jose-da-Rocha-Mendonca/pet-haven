import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });

  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = {
    "General Questions": [
      {
        question: "What should I consider before adopting a pet?",
        answer: "Lifestyle compatibility, space requirements, time commitment, and financial responsibilities."
      },
      {
        question: "How do I know which type of pet is right for me?",
        answer: "Consider your activity level, living situation, allergies, and experience with pets."
      },
      {
        question: "What are the benefits of adopting rather than buying a pet?",
        answer: "Saving a life, reducing overpopulation, and often receiving a pet that's already vaccinated and spayed/neutered."
      }
    ],
    "Adoption Process": [
      {
        question: "What is the typical adoption process?",
        answer: "Filling out an application, meeting the pet, a home visit (sometimes), and paying an adoption fee."
      },
      {
        question: "What questions will the shelter or rescue ask me?",
        answer: "About your lifestyle, home environment, previous pet experience, and how you'll care for the pet."
      },
      {
        question: "What is the adoption fee, and what does it cover?",
        answer: "Fees vary but often include vaccinations, spaying/neutering, microchipping, and sometimes a starter kit."
      }
    ],
    "Pet Care": [
      {
        question: "What kind of care will the pet need?",
        answer: "Regular veterinary visits, proper nutrition, exercise, grooming, and socialization."
      },
      {
        question: "How do I prepare my home for a new pet?",
        answer: "Secure unsafe areas, provide appropriate bedding, food/water bowls, toys, and a designated space for the pet."
      },
      {
        question: "What supplies do I need to have before bringing my pet home?",
        answer: "Food, a leash/harness (for dogs), litter and litter box (for cats), toys, a bed, and grooming tools."
      }
    ],
    "Health and Behavior": [
      {
        question: "Will the pet have any health or behavioral issues?",
        answer: "Shelters often disclose known issues, but ask about the pet's history and temperament."
      },
      {
        question: "What should I do if my adopted pet has trouble adjusting?",
        answer: "Be patient, give them space, maintain a routine, and consider consulting a trainer or veterinarian."
      },
      {
        question: "How do I introduce the new pet to my other pets?",
        answer: "Slowly and in neutral territory if possible, while supervising interactions closely."
      }
    ],
    "Post-Adoption": [
      {
        question: "Can I return the pet if it doesn't work out?",
        answer: "Most shelters have a return policy, but it's important to confirm this before adopting."
      },
      {
        question: "What resources are available to help me with training or care?",
        answer: "Shelters often provide post-adoption support, and there are many local trainers and online resources."
      },
      {
        question: "How long does it take for a pet to adjust to a new home?",
        answer: "It varies, but generally 3 days to decompress, 3 weeks to learn the routine, and 3 months to fully settle."
      }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="help-page">
      <h1>Help Center</h1>
      
      <section className="guide-section">
        <h2>Getting Started</h2>
        <div className="guide-cards">
          <div className="guide-card">
            <h3>Find a Shelter</h3>
            <p>Learn how to search and connect with local shelters in your area.</p>
            <div className="video-container">
              {/* Replace with actual video embed bc idk what the heck to put here*/}
              <iframe src="https://www.youtube.com/embed/example1" title="Shelter Search Tutorial"></iframe>
            </div>
          </div>
          <div className="guide-card">
            <h3>Adoption Process</h3>
            <p>Step-by-step guide to our adoption process.</p>
            <div className="video-container">
              {/* Replace with actual video embed bc idk what the heck to put here*/}
              <iframe src="https://www.youtube.com/embed/example2" title="Adoption Guide"></iframe>
            </div>
          </div>
          <div className="guide-card">
            <h3>App Navigation</h3>
            <p>Learn how to use all features of our application.</p>
            <div className="video-container">
              {/* Replace with actual video embed bc idk what the heck to put here*/}
              <iframe src="https://www.youtube.com/embed/example3" title="App Navigation"></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {Object.entries(faqData).map(([category, questions], categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h3>{category}</h3>
            <div className="faq-questions">
              {questions.map((item, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${expandedFaq === `${categoryIndex}-${index}` ? 'expanded' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === `${categoryIndex}-${index}` ? null : `${categoryIndex}-${index}`)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle">{expandedFaq === `${categoryIndex}-${index}` ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="contact-section">
        <h2>Still Have Questions?</h2>
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

export default Help;
