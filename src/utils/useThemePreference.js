import { useEffect, useMemo, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useConfigActions } from './usePersistantSettings';

function useThemePreference() {
  const { setThemeType } = useConfigActions();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });
  const preferredType = useMemo(() => (prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setThemeType(preferredType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredType]);
}

export default useThemePreference;
