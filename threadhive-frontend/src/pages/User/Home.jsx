import { lazy, Suspense, useEffect, useState } from "react";
import { fetchRecentThreads } from "../../services/threadService";
import ThreadList from "../../components/ThreadList/ThreadList";
import { Container, Card, Button } from "react-bootstrap";
import "./Home.css";

const CreateThreadForm = lazy(() =>
  import("../../components/Forms/CreateThreadForm"),
);

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadThreads = async () => {
      setLoading(true);
      setError(null);
      try {
        const recentThreads = await fetchRecentThreads();
        if (!ignore) setThreads(recentThreads);
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load threads");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadThreads();
    return () => {
      ignore = true;
    };
  }, []);

  const handleVoteUpdate = (threadId, newVoteCount) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread._id === threadId
          ? { ...thread, voteCount: newVoteCount }
          : thread,
      ),
    );
  };

  return (
    <div className="home-wrapper">
      <Container fluid className="home-content">
        <Card className="border-0 rounded-3 shadow-sm mb-3">
          <Card.Body className="p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1
                className="fs-4 fs-md-3 fw-bold mb-0"
                style={{ color: "var(--text-dark)" }}
              >
                🏠 Home Feed
              </h1>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowForm((prev) => !prev)}
              >
                {showForm ? "✕ Close" : "➕ Create"}
              </Button>
            </div>

            {showForm && (
              <Suspense fallback={null}>
                <CreateThreadForm onClose={() => setShowForm(false)} />
              </Suspense>
            )}

            {loading ? (
              <Card.Text className="text-muted text-center py-4">
                Loading threads...
              </Card.Text>
            ) : error ? (
              <Card.Text className="text-danger text-center py-4">
                Error: {error}
              </Card.Text>
            ) : threads.length > 0 ? (
              <ThreadList threads={threads} onVoteUpdate={handleVoteUpdate} />
            ) : (
              <Card.Text className="text-muted text-center py-4">
                No threads found.
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
