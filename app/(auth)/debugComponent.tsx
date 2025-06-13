import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function DebugToken() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        const token = await getToken({ template: "mobile" }); // use your token template name
        console.log('[Clerk] REAL backend token:', token);

        if (!token || token === '__clerk_client_jwt') {
          console.warn('[Clerk] Invalid token received');
        }
      }
    };

    fetchToken();
  }, [isSignedIn]);

  return null;
}
