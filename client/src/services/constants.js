const apiUrl = {
  Development: 'http://localhost:8081',
  // Test: "https://api.test.soniqcalendar.com/",
  // Production: "https://api.soniqcalendar.com/",
};

export const HTTP = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const endPoint = apiUrl[process.env.NODE_ENV] || apiUrl.Development;

export const MaxReviewFileSize = 50 * 1024 * 1024; // MB
