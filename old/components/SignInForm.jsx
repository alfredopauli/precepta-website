import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';
import { useAuth } from '../context/AuthContext';
import "../style/SignInForm.css";


const SignInForm = () => {
  const { session, signInUser } = useAuth(); 
  const navigate = useNavigate();
  
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email"); // The "name" attribute!
      const password = formData.get("password");

      // Call sign in function
      const { 
        success, data, error: signInError
      } = await signInUser(email, password);

      // Handle known errors
      if (signInError) {
        return new Error(signInError);
      }
      // Handle success
      if (success && data?.session) {
        //Navigate to
        navigate("/editarAulas");
        return null;
      }
      // Handle any other cases (safety net)
      return null;
    }, // 1º parameter
    null //initial state
  );

  return (
    <div className="signin-form-container">
      <form
        action={submitAction}
        aria-label="Sign in form"
        aria-describedby="form-description"
      >
        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          type="email"
          name="email"
          id="email"
          placeholder=""
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "signin-error" : undefined}
          disabled={isPending}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
          placeholder=""
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "signin-error" : undefined}
          disabled={isPending}
        />
        <button 
          type="submit"
          className="form-button"
          aria-busy={isPending}
        >
          {isPending ? "Signing in" : "Sign in"}
        </button>
        {error && (
          <div
            id="signin-error"
            role="alert"
            className="signin-form-error-message"
          >
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}


export default SignInForm;

