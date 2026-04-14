// Example of dynamic import for optimization
if (needsData) {
  import('../dataFetcher.js').then(module => {
    module.fetchData();
  });
}