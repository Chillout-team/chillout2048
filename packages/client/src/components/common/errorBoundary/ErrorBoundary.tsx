import React, { ReactNode } from "react";
import { ErrorPage } from "@/features/errorPage/ErrorPage";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorPage type={"500"} />;
        }
        return this.props.children;
    }
}
