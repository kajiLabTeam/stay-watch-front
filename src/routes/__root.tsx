import { MantineProvider } from '@mantine/core';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import Layout from '@/components/layout/Layout';
import AuthEmail from '@/features/Auth/AuthEmail';
import AuthSwitcher from '@/features/Auth/AuthSwitcher';
import { JotaiProvider } from '@/features/admin/editUser/globalState/JotaiProvider';
import { QueryProvider } from '@/features/admin/editUser/globalState/QueryProvider';

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
