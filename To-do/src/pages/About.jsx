export default function About() {
  return (
    <main className="page-container about-page">
      <span className="eyebrow">ABOUT TASKFLOW</span>
      <h1>Simple planning. Better days.</h1>
      <p>
        TaskFlow is a simple task manager designed to help you capture your
        daily priorities, track your progress, and stay organized.
      </p>

      <div className="about-grid">
        <article className="about-card">
          <h2>Stay organized</h2>
          <p>Keep your tasks together in one clean workspace.</p>
        </article>
        <article className="about-card">
          <h2>Track progress</h2>
          <p>Mark completed tasks and see how much remains.</p>
        </article>
        <article className="about-card">
          <h2>Your data stays local</h2>
          <p>Tasks are stored in this browser using local storage.</p>
        </article>
      </div>
    </main>
  );
}