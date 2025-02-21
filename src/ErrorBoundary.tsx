import React, { ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  public state = {
    hasError: false,
    redirect: false,
  };

  public static getDerivedStateFromError = () => {
    return { hasError: true };
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error boundary caught an error", error, errorInfo);
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/"></Redirect>;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here </Link>{" "}
          to go back to home page or wait for 5 seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
