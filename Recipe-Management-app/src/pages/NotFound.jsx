
import { Link } from "react-router-dom";
import { ArrowLeft, ChefHat } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page-container inner-page">
      <div className="empty-state">
        <ChefHat size={42} />
        <h1>404 — Page not found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={17} /> Back to Home
        </Link>
      </div>
    </main>
  );
}
