import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { loginSchema, type LoginInput } from "../validation/authValidation";

// This page lets an existing user sign in.
const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  // React Hook Form handles the input values and validation errors.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // This runs after the user submits valid email and password fields.
  const onSubmit = async (data: LoginInput) => {
    setSubmitError("");
    try {
      await login(data.email, data.password);
      navigate("/editor");
    } catch (error) {
      // If the backend rejects the login, show the message on the page.
      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Could not sign in. Please check your details.",
        );
        return;
      }

      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="auth-shell">
      {/* This is the login card shown in the center of the page. */}
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="brand-lockup">
          <div className="brand-logo">Vi</div>
          <div>
            <h1 className="brand-title">Vi-Notes</h1>
            <p className="brand-tagline">Authenticity Verification Platform</p>
          </div>
        </div>

        <div className="auth-card">
          <h2 id="login-title" className="auth-title">
            Welcome back
          </h2>
          <p className="auth-subtitle">Sign in to continue writing.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {/* This message appears only when the backend login fails. */}
            {submitError && <p className="form-status-error">{submitError}</p>}

            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                {...register("email")}
                type="email"
                className="form-input"
                placeholder="you@example.com"
              />
              {/* This appears when the email does not match our validation rule. */}
              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                {...register("password")}
                type="password"
                className="form-input"
                placeholder="Enter your password"
              />
              {/* This appears when the password field is empty. */}
              {errors.password && (
                <p className="error-text">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="btn btn-primary"
            >
              {isSubmitting || loading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
