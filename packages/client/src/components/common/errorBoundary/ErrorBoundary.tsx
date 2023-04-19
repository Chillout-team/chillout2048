import React, { ReactNode } from "react";
import { ErrorPage } from "@/features/errorPage/ErrorPage";

interface IProps {
    children?: ReactNode;
}

interface IState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
    public state: IState = {
        hasError: false,
    };

    public static getDerivedStateFromError(): IState {
        return { hasError: true };
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorPage type="500" />;
        }
        return this.props.children;
    }
}
