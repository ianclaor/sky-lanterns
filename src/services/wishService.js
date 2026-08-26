const SUBMISSION_KEY = "formSubmissions_v1";
const APPROVED_KEY = "approvedSubmissions_v1";

export const getSubmissions = () => {
  return JSON.parse(localStorage.getItem(SUBMISSION_KEY)) || [];
};

export const saveSubmission = (wish) => {
  const submissions = getSubmissions();

  submissions.push({
    id: Date.now(),
    ...wish,
  });

  localStorage.setItem(
    SUBMISSION_KEY,
    JSON.stringify(submissions)
  );
};

export const getApproved = () => {
  return JSON.parse(localStorage.getItem(APPROVED_KEY)) || [];
};

export const saveApproved = (approved) => {
  localStorage.setItem(
    APPROVED_KEY,
    JSON.stringify(approved)
  );
};