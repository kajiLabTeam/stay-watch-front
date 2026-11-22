import { MantineProvider } from '@mantine/core';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import Layout from '@/components/layout/Layout';
import AuthEmail from '@/components/auth/AuthEmail';
import AuthSwitcher from '@/components/auth/AuthSwitcher';
import { JotaiProvider } from '@/providers/JotaiProvider';
import { QueryProvider } from '@/providers/QueryProvider';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <JotaiProvider>
      <MantineProvider>
        <QueryProvider>
          <Layout>
            <AuthSwitcher>
              <AuthEmail>
                <Outlet />
              </AuthEmail>
            </AuthSwitcher>
          </Layout>
        </QueryProvider>
      </MantineProvider>
    </JotaiProvider>
  );
}
