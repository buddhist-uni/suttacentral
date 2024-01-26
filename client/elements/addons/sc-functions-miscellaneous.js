export function getURLParam(name) {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(name);
  } catch (e) {
    return '';
  }
}

export function isMobileBrowser() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function extractSelectedLangsName(displayedLanguages, linkText) {
  const selectedLangs = displayedLanguages.filter(item => item.checked);
  selectedLangs.sort((a, b) => {
    if (a.is_root && !b.is_root) {
      return -1;
    }
    if (!a.is_root && b.is_root) {
      return 1;
    }
    return 0;
  });

  selectedLangs.forEach(item => {
    if (item.uid === 'lzh') {
      item.name = 'Classic Chinese';
    }
  });

  if (selectedLangs.length === 0) {
    return '';
  }
  if (selectedLangs.length <= 5) {
    return `
      Languages searched
      ${selectedLangs.map(item => item.name).join(', ')}
      <a href="/search-options">${linkText}</a>
    `;
  }
  const firstFiveLangs = selectedLangs.slice(0, 5);
  const restLangs = selectedLangs.slice(5);
  return `
    Languages searched
    ${firstFiveLangs.map(item => item.name).join(', ')}
    +${restLangs.length} more
    <a href="/search-options">${linkText}</a>
  `;
}