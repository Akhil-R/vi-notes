import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import {
  registerSchema,
  type RegisterInput,
} from "../validation/authValidation";

// This page lets a new user create an account.
const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  // React Hook Form connects the inputs with the register validation rules.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // This runs after the form fields pass validation.
  const onSubmit = async (data: RegisterInput) => {
    setSubmitError("");
    try {
      await registerUser(data.name, data.email, data.password);
      navigate("/editor");
    } catch (error) {
      // If the email is already used or the backend fails, show it here.
      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Could not create your account. Please try again.",
        );
        return;
      }

      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="auth-shell">
      {/* This is the register card shown in the center of the page. */}
      <section className="auth-panel" aria-labelledby="register-title">
        <div className="brand-lockup">
          <div className="brand-logo">Vi</div>
          <div>
            <h1 className="brand-title">Vi-Notes</h1>
            <p className="brand-tagline">
              Authenticity Verification Platform
            </p>
          </div>
        </div>

        <div className="auth-card">
          <h2 id="register-title" className="auth-title">
            Create your account
          </h2>
          <p className="auth-subtitle">
            Start with a simple email and password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {/* This message appears only when account creation fails. */}
            {submitError && <p className="form-status-error">{submitError}</p>}

            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                {...register("name")}
                className="form-input"
                placeholder="Full Name"
              />
              {/* This appears when the name is too short. */}
              {errors.name && (
                <p className="error-text">{errors.name.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                {...register("email")}
                type="email"
                className="form-input"
                placeholder="you@example.com"
              />
              {/* This appears when the email is not valid. */}
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
                placeholder="At least 6 characters"
              />
              {/* This appears when the password is too short. */}
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
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
