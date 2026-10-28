import Todoform from "../components/Todoform";
import Todolist from "../components/Todolist";

export default function Home() {
  return (
    <main className="page-container">
      <section className="hero">
        <span className="eyebrow">YOUR PERSONAL PRODUCTIVITY SPACE</span>
        <h1>Make today <span>count.</span></h1>
        <p>Organize your tasks, focus on what matters, and make progress every day.</p>
      </section>

      <section className="todo-panel">
        <Todoform />
        <Todolist />
      </section>
    </main>
  );
}