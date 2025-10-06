// practice.js
// Renders 10 gradient questions with revealable answers

document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    {
      eq: 'f(x, y) = x^2 + y^2',
      point: [2, -1],
      answer: [4, -2]
    },
    {
      eq: 'f(x, y) = 3x + 2y',
      point: [1, 2],
      answer: [3, 2]
    },
    {
      eq: 'f(x, y) = x^2 - y^2',
      point: [-2, 3],
      answer: [-4, -6]
    },
    {
      eq: 'f(x, y) = xy',
      point: [3, 5],
      answer: [5, 3]
    },
    {
      eq: 'f(x, y) = x^3 + y^3',
      point: [2, -1],
      answer: [12, 3]
    },
    {
      eq: 'f(x, y) = 2x^2 + 4y^2',
      point: [1, -2],
      answer: [4, -16]
    },
    {
      eq: 'f(x, y) = x^2 + 2xy + y^2',
      point: [1, 2],
      answer: [6, 6]
    },
    {
      eq: 'f(x, y) = sin(x) + cos(y)',
      point: [0, Math.PI/2],
      answer: [Math.cos(0).toFixed(2), (-Math.sin(Math.PI/2)).toFixed(2)]
    },
    {
      eq: 'f(x, y) = e^{x+y}',
      point: [0, 0],
      answer: [Math.exp(0).toFixed(2), Math.exp(0).toFixed(2)]
    },
    {
      eq: 'f(x, y) = x^2y',
      point: [2, 3],
      answer: [12, 4]
    }
  ];

  const container = document.getElementById('practice-questions');
    questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.style.marginBottom = '22px';
    div.style.padding = '14px 0';
    div.style.borderBottom = '1px solid #eee';
    div.innerHTML = `
  <b>Q${i+1}:</b> Given $${q.eq}$ and the point $(${q.point[0]}, ${q.point[1]})$, what is the gradient vector $\\nabla f$ at this point?
        <button style="margin-left:18px; padding:2px 10px; border-radius:6px; border:1px solid #ccc; background:#f7f7f9; cursor:pointer;" onclick="this.nextElementSibling.style.display='inline'; if(window.MathJax) MathJax.typeset();">Reveal Answer</button>
        <span style="display:none; margin-left:12px; color:#007; font-weight:500;">$\\nabla f = (${q.answer[0]}, ${q.answer[1]})$</span>
    `;
    container.appendChild(div);
  });
    if (window.MathJax) MathJax.typeset();
});
