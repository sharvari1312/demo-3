/**
 * Mock API layer for ScholarPath
 * Provides static data for the frontend only experience
 */

const MockAPI = {
  // Mock scholarship data
  getScholarships: function() {
    return [
      {
        id: 1,
        name: "National Merit Scholarship Scheme",
        provider: "Government of India",
        matchScore: "98%",
        amount: "₹50,000 / year",
        deadline: "15 Nov 2026",
        type: "Central",
        tags: ["Merit-based", "All Categories"]
      },
      {
        id: 2,
        name: "Post Matric Scholarship for Minorities",
        provider: "Ministry of Minority Affairs",
        matchScore: "92%",
        amount: "₹30,000 / year",
        deadline: "30 Oct 2026",
        type: "Central",
        tags: ["Income < 2L", "Minority"]
      },
      {
        id: 3,
        name: "State Merit-cum-Means Scholarship",
        provider: "State Government",
        matchScore: "85%",
        amount: "₹25,000 / year",
        deadline: "10 Dec 2026",
        type: "State",
        tags: ["Income-based", "UG Students"]
      },
      {
        id: 4,
        name: "Reliance Foundation Undergraduate Scholarships",
        provider: "Reliance Foundation",
        matchScore: "78%",
        amount: "Up to ₹2,00,000",
        deadline: "15 Jan 2027",
        type: "Private",
        tags: ["Merit-cum-Means", "Any Stream"]
      }
    ];
  },

  // Mock chatbot replies
  getChatbotReply: function(messageText) {
    const text = messageText.toLowerCase();
    if (text.includes('low income') || text.includes('income')) {
      return "For low-income students, I highly recommend checking the 'Post Matric Scholarships' and 'State Merit-cum-Means' options. Would you like me to filter the results based on your family income?";
    } else if (text.includes('document') || text.includes('certificate')) {
      return "Typically, you will need: Aadhar Card, Income Certificate, Previous Year Marksheets, and Bank Passbook. Make sure they are scanned clearly.";
    } else if (text.includes('score') || text.includes('match score')) {
      return "Your Match Score is calculated using the details you provided. We weigh your academic marks, financial background, and category against the strict eligibility rules of each scholarship to give you a likeliness of selection.";
    } else {
      return "That's a great question! However, I'm currently a mock assistant. Please navigate through the steps to build your profile, and I'll analyze your eligibility!";
    }
  }
};

window.MockAPI = MockAPI;
