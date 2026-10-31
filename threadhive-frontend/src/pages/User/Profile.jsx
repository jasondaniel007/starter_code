import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/authSlice";
import "./Profile.css";

const buildForm = (user) => ({
  name: user?.name || "",
  bio: user?.bio || "",
  location: user?.location || "",
  website: user?.website || "",
});

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(buildForm(user));

  useEffect(() => {
    setForm(buildForm(user));
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...user, ...form }));
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(buildForm(user));
    setEditing(false);
  };

  const initial = (user?.name?.trim()?.[0] || "U").toUpperCase();

  const renderValue = (value, placeholder) =>
    value ? (
      <div className="profile-field-value">{value}</div>
    ) : (
      <div className="profile-field-value empty">{placeholder}</div>
    );

  return (
    <div className="profile-container">
      <button className="profile-back-btn" onClick={() => navigate("/home")}>
        ← Back to Home
      </button>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">{initial}</div>
          </div>
          <div className="profile-info-section">
            <div className="profile-title-row">
              <h2 className="profile-name">{user?.name || "User"}</h2>
              <button
                type="button"
                className="profile-btn profile-btn-primary"
                onClick={() => setEditing((prev) => !prev)}
              >
                ✏ Edit Profile
              </button>
            </div>
          </div>
        </div>

        {editing ? (
          <form className="profile-fields" onSubmit={handleSave}>
            <div className="profile-field">
              <label className="profile-field-label" htmlFor="profile-name">
                Name
              </label>
              <input
                id="profile-name"
                className="profile-form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="profile-field">
              <label className="profile-field-label" htmlFor="profile-email">
                Email
              </label>
              <input
                id="profile-email"
                className="profile-form-control"
                name="email"
                value={user?.email || ""}
                disabled
                readOnly
              />
            </div>
            <div className="profile-field">
              <label className="profile-field-label" htmlFor="profile-bio">
                Bio
              </label>
              <textarea
                id="profile-bio"
                className="profile-form-control"
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
              />
            </div>
            <div className="profile-field">
              <label className="profile-field-label" htmlFor="profile-location">
                Location
              </label>
              <input
                id="profile-location"
                className="profile-form-control"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div className="profile-field">
              <label className="profile-field-label" htmlFor="profile-website">
                Website
              </label>
              <input
                id="profile-website"
                className="profile-form-control"
                name="website"
                value={form.website}
                onChange={handleChange}
              />
            </div>
            <div className="profile-title-row">
              <button type="submit" className="profile-btn profile-btn-success">
                Save
              </button>
              <button
                type="button"
                className="profile-btn profile-btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-fields">
            <div className="profile-field">
              <div className="profile-field-label">Name</div>
              {renderValue(user?.name, "Not set")}
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Email</div>
              {renderValue(user?.email, "Not set")}
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Bio</div>
              {renderValue(user?.bio, "No bio added")}
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Location</div>
              {renderValue(user?.location, "No location added")}
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Website</div>
              {renderValue(user?.website, "No website added")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
