import { useState } from 'react';

function useSearchFormData(initialState) {
  const [searchTerm, setSearchTerm] = useState(initialState?.searchTerm || '');
  const [library, setLibrary] = useState(initialState?.library || 'TextBlob');
  const [advancedOptions, setAdvancedOptions] = useState({
    amount: parseInt(initialState?.advancedOptions?.amount, 10) || 100,
    region: initialState?.advancedOptions?.region || '',
    from: initialState?.advancedOptions?.from || '',
    to: initialState?.advancedOptions?.to || '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return {
    searchTerm,
    library,
    advancedOptions,
    showAdvanced,
    isLoading,
    setSearchTerm,
    setLibrary,
    setAdvancedOptions,
    setShowAdvanced,
    setIsLoading,
  };
}

export default useSearchFormData;
