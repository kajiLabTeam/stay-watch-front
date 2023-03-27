import React, { ErrorInfo } from 'react';

/**
 * 子要素でエラーが発生した際に取得し、その情報をコンソールログに出力する
 * エラーが発生したことはユーザーに知らせる
 */
class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>エラーが発生しました</div>;
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
