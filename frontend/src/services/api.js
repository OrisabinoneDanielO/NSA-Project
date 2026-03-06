/**
 * API SERVICE ARCHITECTURE
 * ----------------------------------------------------------------------------------------
 * This file serves as the centralized contract between the frontend and the future backend.
 * Currently, it simulates asynchronous REST API calls using local storage and mock data.
 * 
 * BACKEND INTEGRATION INSTRUCTIONS:
 * 1. Replace the simulated `delay` and simulated return logic inside each function with real
 *    `fetch()` or `axios.get/post` calls to your secure backend (e.g., Express, Django, Spring).
 * 2. Ensure your backend endpoints return data in the exact JSON shapes modeled below.
 * 3. Incorporate JWT tokens or cookies into the headers of these requests for authorization.
 */

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // ---------------------------------------------------
  // AUTHENTICATION
  // ---------------------------------------------------

  /**
   * @route POST /api/auth/login
   * @payload { email, password }
   * @returns { user: { id, name, email, role }, token }
   */
  login: async (credentials) => {
    await delay(800);
    // Backend placeholder
    return { success: true, token: 'mock_jwt_token_123' };
  },

  // ---------------------------------------------------
  // USERS (God Mode / System Provisioning)
  // ---------------------------------------------------

  /**
   * @route GET /api/users
   * @returns Array of { id, name, email, role, status, lastActive }
   */
  getUsers: async () => {
    await delay();
    // Return standard structure required by AdminUsers table
    return [];
  },

  /**
   * @route POST /api/users/bulk
   * @payload FormData containing CSV file
   */
  bulkEnrollUsers: async (formData) => {
    await delay(1500);
    return { success: true, count: 45 };
  },

  // ---------------------------------------------------
  // ACADEMICS & COURSES
  // ---------------------------------------------------

  /**
   * @route GET /api/classes
   * @returns Array of { id, name, level, teacher, arm, students, subjects: [] }
   */
  getClasses: async () => {
    await delay();
    // Currently handled by `nsa_classes` localStorage in prototype
    const saved = localStorage.getItem('nsa_classes');
    if (saved) return JSON.parse(saved);
    return [];
  },

  /**
   * @route POST /api/classes/promote
   * @payload { fromClassId, toClassId }
   */
  promoteStudents: async (fromId, toId) => {
    await delay(800);
    return { success: true };
  },

  // ---------------------------------------------------
  // GRADES & REPORTS
  // ---------------------------------------------------

  /**
   * @route GET /api/grades/:classId/:subjectId
   * @returns Array of { studentId, studentName, ca1, ca2, exam, total, grade, remark }
   */
  getGradesForClass: async (classId, subjectId) => {
    await delay();
    return [];
  },

  /**
   * @route POST /api/grades
   * @payload { classId, subjectId, term, session, grades: [{ studentId, ca1, ca2, exam }] }
   */
  saveGrades: async (payload) => {
    await delay(600);
    return { success: true };
  },

  /**
   * @route POST /api/reports/lock
   * @payload { classId, term, session }
   */
  lockClassReport: async (classId) => {
    await delay(800);
    return { success: true, locked: true };
  },

  // ---------------------------------------------------
  // COMMUNICATIONS
  // ---------------------------------------------------

  /**
   * @route POST /api/announcements
   * @payload { title, message, audience, isUrgent }
   */
  broadcastAnnouncement: async (payload) => {
    await delay(1000);
    return { success: true };
  }
};

export default api;
