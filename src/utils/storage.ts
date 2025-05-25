export const saveAnswers = (answers: unknown): void => {
  sessionStorage.setItem('answers', JSON.stringify(answers));
};

export const loadAnswers = (): unknown => {
  const raw = sessionStorage.getItem('answers');
  return raw ? JSON.parse(raw) : null;
};
