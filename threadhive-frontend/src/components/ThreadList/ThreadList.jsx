import { upvoteThread, downvoteThread } from "../../services/threadService";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import VoteButtons from "../Shared/VoteButtons";
import "./ThreadList.css";

export default function ThreadList({ threads, onVoteUpdate }) {
  const handleVote = async (voteFn, threadId) => {
    try {
      const updatedThread = await voteFn(threadId);
      if (onVoteUpdate) {
        onVoteUpdate(threadId, updatedThread.voteCount);
      }
    } catch (err) {
      console.error("Failed to vote:", err);
    }
  };

  return (
    <Container fluid className="px-0">
      {threads.map((thread) => (
        <div key={thread._id} className="thread-card">
          <div className="thread-card-body">
            {/* Voting Section */}
            <div className="vote-section">
              <VoteButtons
                count={thread.voteCount}
                onUpvote={() => handleVote(upvoteThread, thread._id)}
                onDownvote={() => handleVote(downvoteThread, thread._id)}
              />
            </div>

            {/* Thread Info */}
            <div className="thread-content-section">
              <div className="thread-header">
                <h5 className="thread-title">{thread.title}</h5>
                <span className="subreddit-badge">
                  r/{thread.subreddit?.name || "unknown"}
                </span>
              </div>
              <p className="thread-text">{thread.content}</p>
              <Link to={`/thread/${thread._id}`} className="view-thread-btn">
                💬 View Comments
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}
